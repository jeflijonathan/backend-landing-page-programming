const BaseController = require("../../common/base/baseController");

class UserController extends BaseController {
    constructor(userService) {
        super();
        this.userService = userService;

        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/v1/users", this.getAllUsers.bind(this));
        this.router.get("/v1/users/:id", this.getUserById.bind(this));
        this.router.post("/v1/users", this.createUser.bind(this));
        this.router.put("/v1/users/:id", this.updateUser.bind(this));
        this.router.delete("/v1/users/:id", this.deleteUser.bind(this));
    }

    async getAllUsers(req, res) {
        try {
            const result = await this.userService.getAllUsers(req.query);
            this.handleSuccess(res, result, "Users Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getUserById(req, res) {
        try {
            const result = await this.userService.getUserById(req.params.id);
            this.handleSuccess(res, result, "User Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async createUser(req, res) {
        try {
            const result = await this.userService.createUser(req.body);
            this.handleSuccess(res, result, "User Successfully Created", 201);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateUser(req, res) {
        try {
            const result = await this.userService.updateUser(req.params.id, req.body);
            this.handleSuccess(res, result, "User Successfully Updated");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async deleteUser(req, res) {
        try {
            await this.userService.deleteUser(req.params.id);
            this.handleSuccess(res, {}, "User Successfully Deleted");
        } catch (error) {
            this.handleError(res, error);
        }
    }
}

module.exports = UserController;
