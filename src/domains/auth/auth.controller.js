const BaseController = require("../../common/base/baseController");

class AuthController extends BaseController {
    constructor(authService) {
        super();
        this.authService = authService;

        this.initRoutes();
    }

    initRoutes() {
        this.router.post("/v1/auth/login", this.login.bind(this));
        this.router.post("/v1/auth/refresh-token", this.refreshToken.bind(this));
        this.router.post("/v1/auth/logout", this.logout.bind(this));
        this.router.get("/v1/auth/sessions", this.getAllSessions.bind(this));
        this.router.delete("/v1/auth/sessions/:id", this.revokeSession.bind(this));
    }

    async login(req, res) {
        try {
            const result = await this.authService.login(req.body);
            this.handleSuccess(res, result, "User Successfully Logged In");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async refreshToken(req, res) {
        try {
            const result = await this.authService.refreshToken(req.body);
            this.handleSuccess(res, result, "Token Refreshed");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async logout(req, res) {
        try {
            const result = await this.authService.logout(req.body.user_id);
            this.handleSuccess(res, result, "User Successfully Logged Out");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getAllSessions(req, res) {
        try {
            const result = await this.authService.getAllSessions(req.query.user_id);
            this.handleSuccess(res, result, "Sessions Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async revokeSession(req, res) {
        try {
            await this.authService.revokeSession(req.params.id);
            this.handleSuccess(res, {}, "Session Revoked");
        } catch (error) {
            this.handleError(res, error);
        }
    }
}

module.exports = AuthController;
