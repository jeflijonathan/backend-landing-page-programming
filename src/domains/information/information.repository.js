const BasePostgres = require("../../common/base/basePostgres");

class InformationRepository extends BasePostgres {
    constructor(model) {
        super(model);
    }

    async findAllWithPagination({ where, order, limit, offset }) {
        return await this.findAndCountAll({
            where,
            include: ["file", "author"],
            limit,
            offset,
            order
        });
    }

    async findById(id) {
        return await this.findByPk(id, {
            include: ["file", "author"]
        });
    }
}

module.exports = InformationRepository;
