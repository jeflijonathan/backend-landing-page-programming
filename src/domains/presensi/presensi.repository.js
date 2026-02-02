const BasePostgres = require("../../common/base/basePostgres");

class PresensiRepository extends BasePostgres {
    constructor(model, sessionModel, statusModel) {
        super(model);
        this.sessionModel = sessionModel;
        this.statusModel = statusModel;
    }

    async findStatusByName(name) {
        return await this.statusModel.findOne({
            where: { name }
        });
    }

    async findAllSessions(query) {
        const { limit, offset, where, order } = query;
        return await this.sessionModel.findAndCountAll({
            where,
            include: ["sessionStatus"],
            limit,
            offset,
            order,
        });
    }

    async findSessionById(id) {
        return await this.sessionModel.findByPk(id, {
            include: ["sessionStatus", "attendances"],
        });
    }

    async createSession(payload, options = {}) {
        return await this.sessionModel.create(payload, options);
    }

    async updateSession(id, payload, options = {}) {
        return await this.sessionModel.update(payload, {
            where: { id },
            ...options,
        });
    }

    async findAttendance(sessionId, postId) {
        return await this.model.findOne({
            where: {
                id_presensi_sessions: sessionId,
                id_post: postId,
            },
        });
    }

    async findHistoryByPostId(postId, { startDate, endDate, limit, offset }) {
        const { Op } = require("sequelize");
        const where = { id_post: postId };

        if (startDate || endDate) {
            where.created_at = {};
            if (startDate) where.created_at[Op.gte] = new Date(startDate);
            if (endDate) where.created_at[Op.lte] = new Date(endDate);
        }

        return await this.findAndCountAll({
            where,
            include: ["session", "attendanceStatus"],
            limit,
            offset,
            order: [["created_at", "DESC"]],
        });
    }

    async findAttendanceForExport({ startDate, endDate }) {
        const { Op } = require("sequelize");
        const where = {};

        if (startDate || endDate) {
            where.created_at = {};
            if (startDate) where.created_at[Op.gte] = new Date(startDate);
            if (endDate) where.created_at[Op.lte] = new Date(endDate);
        }

        return await this.model.findAll({
            where,
            include: [
                { model: this.sessionModel, as: "session" },
                { association: "attendanceStatus" },
                { association: "post" }
            ],
            order: [["created_at", "ASC"]],
        });
    }

    async bulkCreateAttendance(attendances, options = {}) {
        return await this.model.bulkCreate(attendances, options);
    }
}

module.exports = PresensiRepository;
