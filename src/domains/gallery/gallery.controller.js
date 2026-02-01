const BaseController = require("../../common/base/baseController");

class GalleryController extends BaseController {
    constructor(galleryService) {
        super();
        this.galleryService = galleryService;
        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/feed", this.getAllGalleries.bind(this));
        this.router.get("/feed/:id", this.getGalleryById.bind(this));
        this.router.post("/feed", this.createGallery.bind(this));
        this.router.put("/feed/:id", this.updateGallery.bind(this));
        this.router.delete("/feed/:id", this.deleteGallery.bind(this));
    }

    async createGallery(req, res) {
        try {
            const result = await this.galleryService.createGallery(req.body);
            this.handleSuccess(res, result, "Gallery data successfully created", 201);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getAllGalleries(req, res) {
        try {
            const result = await this.galleryService.getAllGalleries(req.query);
            this.handleSuccess(res, result, "Gallery data successfully fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getGalleryById(req, res) {
        try {
            const result = await this.galleryService.getGalleryById(req.params.id);
            this.handleSuccess(res, result, "Gallery data successfully fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async updateGallery(req, res) {
        try {
            const result = await this.galleryService.updateGallery(req.params.id, req.body);
            this.handleSuccess(res, result, "Gallery data successfully updated");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async deleteGallery(req, res) {
        try {
            await this.galleryService.deleteGallery(req.params.id);
            this.handleSuccess(res, {}, "Gallery data successfully deleted");
        } catch (error) {
            this.handleError(res, error);
        }
    }
}

module.exports = GalleryController;
