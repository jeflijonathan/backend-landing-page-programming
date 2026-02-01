const BaseController = require("../../common/base/baseController");

class DivisionController extends BaseController {
    constructor(divisionService) {
        super();
        this.divisionService = divisionService;
        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/v1/division", this.getAllDivisions.bind(this));
        this.router.get("/v1/division/:id", this.getDivisionById.bind(this));
        this.router.post("/v1/division", this.createDivision.bind(this));
        this.router.put("/v1/division/:id", this.updateDivision.bind(this));
        this.router.delete("/v1/division/:id", this.deleteDivision.bind(this));
    }

    async getAllDivisions(req, res) {
        try {
            const result = await this.divisionService.getAllDivisions(req.query);
            this.handleSuccess(res, result, "Division Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getDivisionById(req, res) {
        try {
            const result = await this.divisionService.getDivisionById(req.params.id);
            this.handleSuccess(res, result, "Division Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async createDivision(req, res) {
        try {
            const result = await this.divisionService.createDivision(req.body);
            this.handleSuccess(res, result, "Division Successfully Created", 201);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateDivision(req, res) {
        try {
            const result = await this.divisionService.updateDivision(req.params.id, req.body);
            this.handleSuccess(res, result, "Division Successfully Updated");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async deleteDivision(req, res) {
        try {
            await this.divisionService.deleteDivision(req.params.id);
            this.handleSuccess(res, {}, "Division Successfully Deleted");
        } catch (error) {
            this.handleError(res, error);
        }
    }
}

module.exports = DivisionController;
