const BaseController = require("../../common/base/baseController");

class InformationController extends BaseController {
    constructor(informationService) {
        super();
        this.informationService = informationService;

        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/v1/information", this.getAllInformations.bind(this));
        this.router.get("/v1/information/:id", this.getInformationById.bind(this));
        this.router.post("/v1/information", this.createInformation.bind(this));
        this.router.put("/v1/information/:id", this.updateInformation.bind(this));
        this.router.delete("/v1/information/:id", this.deleteInformation.bind(this));
    }

    async getAllInformations(req, res) {
        try {
            const result = await this.informationService.getAllInformations(req.query);
            this.handleSuccess(res, result, "Informasi Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getInformationById(req, res) {
        try {
            const result = await this.informationService.getInformationById(req.params.id);
            this.handleSuccess(res, result, "Informasi Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async createInformation(req, res) {
        try {
            const result = await this.informationService.createInformation(req.body);
            this.handleSuccess(res, result, "Informasi Successfully Created", 201);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateInformation(req, res) {
        try {
            const result = await this.informationService.updateInformation(req.params.id, req.body);
            this.handleSuccess(res, result, "Informasi Successfully Updated");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async deleteInformation(req, res) {
        try {
            await this.informationService.deleteInformation(req.params.id);
            this.handleSuccess(res, {}, "Informasi Successfully Deleted");
        } catch (error) {
            this.handleError(res, error);
        }
    }
}

module.exports = InformationController;
