const BaseController = require("../../common/base/baseController");

class PresensiController extends BaseController {
    constructor(presensiService) {
        super();
        this.presensiService = presensiService;
        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/v1/presensi-sessions", this.getAllSessions.bind(this));
        this.router.get("/v1/presensi-sessions/:id", this.getSessionById.bind(this));
        this.router.post("/v1/presensi-sessions", this.createSession.bind(this));
        this.router.put("/v1/presensi-sessions/:id", this.updateSession.bind(this));
        this.router.post("/v1/presensi/scan", this.scanPresensi.bind(this));
        this.router.get("/v1/presensi/history/:postId", this.getAttendanceHistory.bind(this));
        this.router.get("/v1/presensi/export", this.exportToExcel.bind(this));
    }

    async getAllSessions(req, res) {
        try {
            const result = await this.presensiService.getAllSessions(req.query);
            this.handleSuccess(res, result, "Sessions Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getSessionById(req, res) {
        try {
            const result = await this.presensiService.getSessionById(req.params.id);
            this.handleSuccess(res, result, "Session Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async createSession(req, res) {
        try {
            const result = await this.presensiService.createSession(req.body);
            this.handleSuccess(res, result, "Session Successfully Created", 201);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateSession(req, res) {
        try {
            const result = await this.presensiService.updateSession(req.params.id, req.body);
            this.handleSuccess(res, result, "Session Successfully Updated");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async scanPresensi(req, res) {
        try {
            const result = await this.presensiService.scanPresensi(req.body);
            this.handleSuccess(res, result, "Attendance Successfully Logged");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getAttendanceHistory(req, res) {
        try {
            const result = await this.presensiService.getAttendanceHistory(req.params.postId, req.query);
            this.handleSuccess(res, result, "Attendance History Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async exportToExcel(req, res) {
        try {
            const workbook = await this.presensiService.exportToExcel(req.query);

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=" + `Attendance_Recap_${Date.now()}.xlsx`
            );

            await workbook.xlsx.write(res);
            res.end();
        } catch (error) {
            this.handleError(res, error);
        }
    }
}

module.exports = PresensiController;
