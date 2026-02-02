const BaseController = require("../../common/base/baseController");
const { upload, processFile } = require("./utils/fileUploader");
const authMiddleware = require("../../middleware/auth.middleware");
const path = require("path");
const fs = require("fs");

class UploadFileController extends BaseController {
    constructor(uploadFileService) {
        super();
        this.uploadFileService = uploadFileService;

        this.uploadMiddleware = [upload.single("file"), processFile];

        this.initRoutes();
    }

    initRoutes() {
        this.router.get("/v1/upload-file", this.getAllFiles.bind(this));
        this.router.get("/v1/upload-file/view/:filename", this.viewFile.bind(this));
        this.router.get("/v1/upload-file/download/:filename", authMiddleware, this.downloadFile.bind(this));
        this.router.get("/v1/upload-file/:id", this.getFileById.bind(this));
        this.router.post("/v1/upload-file", authMiddleware, this.uploadMiddleware, this.uploadFile.bind(this));
        this.router.delete("/v1/upload-file/:id", authMiddleware, this.deleteFile.bind(this));
    }

    async viewFile(req, res) {
        const { filename } = req.params;
        const uploadDir = path.join(process.cwd(), 'uploads');
        const filePath = path.join(uploadDir, filename);

        if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return this.handleError(res, { statusCode: 400, message: "Invalid filename" });
        }

        try {
            await fs.promises.access(filePath);
            const ext = path.extname(filename).toLowerCase();
            let contentType = 'application/octet-stream';

            if (['.jpg', '.jpeg'].includes(ext)) contentType = 'image/jpeg';
            else if (['.png'].includes(ext)) contentType = 'image/png';
            else if (['.webp'].includes(ext)) contentType = 'image/webp';
            else if (['.pdf'].includes(ext)) contentType = 'application/pdf';

            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Disposition', `inline; filename="${filename}"`);

            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } catch (error) {
            return this.handleError(res, { statusCode: 404, message: "File not found" });
        }
    }

    async downloadFile(req, res) {
        const { filename } = req.params;
        const uploadDir = path.join(process.cwd(), 'uploads');
        const filePath = path.join(uploadDir, filename);

        if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
            return this.handleError(res, { statusCode: 400, message: "Invalid filename" });
        }

        try {
            await fs.promises.access(filePath);

            const ext = path.extname(filename).toLowerCase();
            let contentType = 'application/octet-stream';

            if (['.jpg', '.jpeg'].includes(ext)) contentType = 'image/jpeg';
            else if (['.png'].includes(ext)) contentType = 'image/png';
            else if (['.webp'].includes(ext)) contentType = 'image/webp';
            else if (['.pdf'].includes(ext)) contentType = 'application/pdf';

            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

            const fileStream = fs.createReadStream(filePath);
            fileStream.pipe(res);
        } catch (error) {
            return this.handleError(res, { statusCode: 404, message: "File not found" });
        }
    }

    async getAllFiles(req, res) {
        try {
            const result = await this.uploadFileService.getAllFiles(req.query);
            this.handleSuccess(res, result, "Files Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async getFileById(req, res) {
        try {
            const result = await this.uploadFileService.getFileById(req.params.id);
            this.handleSuccess(res, result, "File Successfully Fetched");
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async uploadFile(req, res) {
        try {
            const result = await this.uploadFileService.uploadFile(req.file);
            this.handleSuccess(res, result, "File Successfully Uploaded", 201);
        } catch (error) {
            this.handleError(res, error);
        }
    }

    async deleteFile(req, res) {
        try {
            await this.uploadFileService.deleteFile(req.params.id);
            this.handleSuccess(res, {}, "File Successfully Deleted");
        } catch (error) {
            this.handleError(res, error);
        }
    }
}

module.exports = UploadFileController;
