const fs = require("fs");
const path = require("path");

class UploadFileService {
    constructor(uploadFileRepository) {
        this.uploadFileRepo = uploadFileRepository;
    }

    async uploadFile(file) {
        if (!file) throw new Error("No file uploaded");

        const url = `/uploads/${file.filename}`;

        const record = await this.uploadFileRepo.create({
            url: url
        });

        return record;
    }

    async getAllFiles(query) {
        const { page = 1, limit = 10 } = query;
        const offset = (page - 1) * limit;

        const files = await this.uploadFileRepo.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
            order: [["created_at", "DESC"]],
        });

        return {
            data: files.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: files.count,
                total_pages: Math.ceil(files.count / limit),
            }
        };
    }

    async getFileById(id) {
        return await this.uploadFileRepo.findByPk(id);
    }

    async deleteFile(id) {
        const file = await this.uploadFileRepo.findByPk(id);
        if (file) {
            const filePath = path.join(process.cwd(), file.url);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        return await this.uploadFileRepo.destroy({ where: { id } });
    }
}

module.exports = UploadFileService;
