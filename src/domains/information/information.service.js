const {
    StatusInternalServerError,
    StatusNotFound,
} = require("../../common/consts/statusCodes");
const { CreateInformationDTO, UpdateInformationDTO } = require("./dto");
const { Op } = require("sequelize");
const redisClient = require("../../config/cache/redis").getInstance();

class InformationService {
    constructor(informationRepository) {
        this.informationRepo = informationRepository;
    }

    async createInformation(payload) {
        await CreateInformationDTO.from(payload);

        return await this.informationRepo.create(payload);
    }

    async getAllInformations(query) {
        const { page = 1, limit = 10, search, sort } = query;

        const keyParams = {
            page: parseInt(page),
            limit: parseInt(limit),
            search: search || null,
            sort: sort || null,
        };
        const cacheKey = `informations:${JSON.stringify(keyParams)}`;

        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }
        } catch (err) {
            console.error("Redis Error:", err);
        }

        const offset = (page - 1) * limit;
        const where = {};

        if (search) {
            where[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ];
        }

        const order = sort ? [[sort, "ASC"]] : [["created_at", "DESC"]];

        const informations = await this.informationRepo.findAllWithPagination({
            where,
            order,
            limit,
            offset,
        });

        const result = {
            data: informations.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: informations.count,
                total_pages: Math.ceil(informations.count / limit),
            },
        };

        try {
            await redisClient.set(cacheKey, JSON.stringify(result), { EX: 60 });
        } catch (err) {
            console.error("Redis Error:", err);
        }

        return result;
    }

    async getInformationById(id) {
        const information = await this.informationRepo.findById(id);

        if (!information) {
            throw {
                statusCode: StatusNotFound,
                message: "Information not found",
            };
        }

        return information;
    }

    async updateInformation(id, payload) {
        await UpdateInformationDTO.from(payload);

        const information = await this.informationRepo.findById(id);
        if (!information) {
            throw {
                statusCode: StatusNotFound,
                message: "Information not found",
            };
        }

        await this.informationRepo.update(payload, { where: { id } });

        return await this.getInformationById(id);
    }

    async deleteInformation(id) {
        const information = await this.informationRepo.findById(id);
        if (!information) {
            throw {
                statusCode: StatusNotFound,
                message: "Information not found",
            };
        }

        // Soft delete
        return await this.informationRepo.update({ deleted_at: new Date() }, { where: { id } });
    }
}

module.exports = InformationService;
