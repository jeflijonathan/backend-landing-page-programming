const BaseDTO = require("../../common/base/baseDTO");
const { DivisionCreateDTO, UpdateDivisionDTO } = require("./dto");

class DivisionService {
    constructor(divisionRepository) {
        this.divisionRepo = divisionRepository;
    }

    async createDivision(payload) {
        await DivisionCreateDTO.from(payload);
        return await this.divisionRepo.create(payload);
    }

    async getAllDivisions(query) {
        const { page = 1, limit = 10 } = query;
        const offset = (page - 1) * limit;

        const divisions = await this.divisionRepo.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        return {
            data: divisions.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: divisions.count,
                total_pages: Math.ceil(divisions.count / limit),
            },
        };
    }

    async getDivisionById(id) {
        return await this.divisionRepo.findByPk(id);
    }

    async updateDivision(id, payload) {
        await UpdateDivisionDTO.from(payload);
        await this.divisionRepo.update(payload, { where: { id } });
        return await this.divisionRepo.findByPk(id);
    }

    async deleteDivision(id) {
        // Soft delete by setting deleted_at
        return await this.divisionRepo.update({ deleted_at: new Date() }, { where: { id } });
    }
}

module.exports = DivisionService;
