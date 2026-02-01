const BaseController = require("../../common/base/baseController");

class RoleController extends BaseController {
    constructor(roleService) {
        super();
        this.roleService = roleService;
        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/v1/role", this.getAllRoles.bind(this));
        this.router.get("/v1/role/:id", this.getRoleById.bind(this));
        this.router.post("/v1/role", this.createRole.bind(this));
        this.router.put("/v1/role/:id", this.updateRole.bind(this));
        this.router.delete("/v1/role/:id", this.deleteRole.bind(this));
    }

    async getAllRoles(req, res) {
        try {
            const result = await this.roleService.getAllRoles(req.query);
            this.handleSuccess(res, result, "Roles Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getRoleById(req, res) {
        try {
            const result = await this.roleService.getRoleById(req.params.id);
            this.handleSuccess(res, result, "Role Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async createRole(req, res) {
        try {
            const result = await this.roleService.createRole(req.body);
            this.handleSuccess(res, result, "Role Successfully Created", 201);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateRole(req, res) {
        try {
            const result = await this.roleService.updateRole(req.params.id, req.body);
            this.handleSuccess(res, result, "Role Successfully Updated");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async deleteRole(req, res) {
        try {
            await this.roleService.deleteRole(req.params.id);
            this.handleSuccess(res, {}, "Role Successfully Deleted");
        } catch (error) {
            this.handleError(res, error);
        }
    }
}

module.exports = RoleController;
