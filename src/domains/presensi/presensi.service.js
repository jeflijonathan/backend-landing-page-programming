const {
    StatusNotFound,
} = require("../../common/consts/statusCodes");
const { CreateSessionPresensiDTO, UpdateSessionPresensiDTO, ScanPresensiDTO } = require("./dto");
const PresensiValidator = require("./presensi.validator");
const { Op } = require("sequelize");
const redisClient = require("../../config/cache/redis").getInstance();
const ExcelJS = require("exceljs");

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

    async exportToExcel(query) {
        const { startDate, endDate } = query;
        const attendances = await this.presensiRepo.findAttendanceForExport({ startDate, endDate });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Recap Attendance");

        const uniqueSessionTitles = [];

        const memberMap = new Map();

        attendances.forEach((att) => {
            const sessionTitle = att.session?.title || "Unknown Session";
            if (!uniqueSessionTitles.includes(sessionTitle)) {
                uniqueSessionTitles.push(sessionTitle);
            }

            const postId = att.id_post;
            if (!memberMap.has(postId)) {
                memberMap.set(postId, {
                    fullname: att.post?.fullname || "N/A",
                    npm: att.post?.npm || "N/A",
                    attendance: {},
                });
            }

            memberMap.get(postId).attendance[sessionTitle] = att.attendanceStatus?.name || "N/A";
        });

        const columns = [
            { header: "No", key: "no", width: 5 },
            { header: "Nama Lengkap", key: "fullname", width: 30 },
            { header: "NPM", key: "npm", width: 15 },
        ];

        uniqueSessionTitles.forEach((title) => {
            columns.push({ header: title, key: title.replace(/\s+/g, '_'), width: 25 });
        });

        worksheet.columns = columns;

        let rowCount = 1;
        memberMap.forEach((data) => {
            const row = {
                no: rowCount++,
                fullname: data.fullname,
                npm: data.npm,
            };

            uniqueSessionTitles.forEach((title) => {
                row[title.replace(/\s+/g, '_')] = data.attendance[title] || "-";
            });

            worksheet.addRow(row);
        });

        worksheet.getRow(1).eachCell((cell) => {
            cell.font = { bold: true };
            cell.alignment = { vertical: 'middle', horizontal: 'center' };
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFE0E0E0' }
            };
        });

        return workbook;
    }
}

module.exports = PresensiService;
