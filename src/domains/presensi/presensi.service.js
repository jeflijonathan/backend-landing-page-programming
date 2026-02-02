const {
    StatusNotFound,
} = require("../../common/consts/statusCodes");
const { CreateSessionPresensiDTO, UpdateSessionPresensiDTO, ScanPresensiDTO } = require("./dto");
const PresensiValidator = require("./presensi.validator");
const { Op } = require("sequelize");
const redisClient = require("../../config/cache/redis").getInstance();

class PresensiService {
    constructor(presensiRepo, postModel, roleUserModel) {
        this.presensiRepo = presensiRepo;
        this.PostModel = postModel;
        this.RoleUserModel = roleUserModel;
    }

    async createSession(payload) {
        await CreateSessionPresensiDTO.from(payload);
        PresensiValidator.validateSessionDates(payload.open_at, payload.close_at);

        const transaction = await this.presensiRepo.model.sequelize.transaction();

        try {
            const session = await this.presensiRepo.createSession(payload, { transaction });

            if (payload.role_filter && payload.role_filter.length > 0) {
                const eligiblePosts = await this.PostModel.findAll({
                    include: [{
                        association: "user",
                        required: true,
                        include: [{
                            association: "tokens",
                        }]
                    }]
                });
            }

            await transaction.commit();
            return session;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async getAllSessions(query) {
        const { page = 1, limit = 10, search, sort } = query;
        const cacheKey = `presensi_sessions:${JSON.stringify(query)}`;

        try {
            const cached = await redisClient.get(cacheKey);
            if (cached) return JSON.parse(cached);
        } catch (err) { }

        const offset = (page - 1) * limit;
        const where = search ? { title: { [Op.iLike]: `%${search}%` } } : {};
        const order = sort ? [[sort, "ASC"]] : [["created_at", "DESC"]];

        const result = await this.presensiRepo.findAllSessions({ limit, offset, where, order });

        const mappedResult = {
            data: result.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: result.count,
                total_pages: Math.ceil(result.count / limit),
            },
        };

        try {
            await redisClient.set(cacheKey, JSON.stringify(mappedResult), { EX: 60 });
        } catch (err) { }

        return mappedResult;
    }

    async getSessionById(id) {
        const session = await this.presensiRepo.findSessionById(id);
        if (!session) throw { statusCode: StatusNotFound, message: "Session not found" };
        return session;
    }

    async updateSession(id, payload) {
        await UpdateSessionPresensiDTO.from(payload);
        if (payload.open_at && payload.close_at) {
            PresensiValidator.validateSessionDates(payload.open_at, payload.close_at);
        }

        await this.presensiRepo.updateSession(id, payload);
        return await this.getSessionById(id);
    }

    async scanPresensi(payload) {
        await ScanPresensiDTO.from(payload);

        const session = await this.presensiRepo.findSessionById(payload.id_presensi_sessions);
        if (!session) throw { statusCode: StatusNotFound, message: "Session not found" };

        PresensiValidator.validateScanTime(session);

        const presentStatus = await this.presensiRepo.findStatusByName('present');
        if (!presentStatus) {
            throw {
                statusCode: StatusNotFound,
                message: "Attendance status 'present' not found in database",
            };
        }

        payload.statusPresensi = presentStatus.id;

        let attendance = await this.presensiRepo.findAttendance(payload.id_presensi_sessions, payload.id_post);

        if (attendance) {
            await this.presensiRepo.update(payload, { where: { id: attendance.id } });
        } else {
            attendance = await this.presensiRepo.create(payload);
        }

        return await this.presensiRepo.findById(attendance.id || attendance[0]?.id);
    }

    async getAttendanceHistory(postId, query) {
        const { page = 1, limit = 10, startDate, endDate } = query;
        const offset = (page - 1) * limit;

        const result = await this.presensiRepo.findHistoryByPostId(postId, {
            startDate,
            endDate,
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        return {
            data: result.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: result.count,
                total_pages: Math.ceil(result.count / limit),
            },
        };
    }
}

module.exports = PresensiService;
