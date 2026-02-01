const { Model } = require("sequelize");

class BasePostgres {
    constructor(model) {
        this.model = model;
    }

    async create(data, options) {
        return await this.model.create(data, options);
    }

    async findOne(query) {
        return await this.model.findOne(query);
    }

    async findAll(query = {}) {
        return await this.model.findAll(query);
    }

    async findByPk(id, options) {
        return await this.model.findByPk(id, options);
    }

    async update(data, query) {
        return await this.model.update(data, query);
    }

    async delete(query) {
        return await this.model.destroy(query);
    }

    async count(query = {}) {
        return await this.model.count(query);
    }

    async findAndCountAll(query = {}) {
        return await this.model.findAndCountAll(query);
    }
}

module.exports = BasePostgres;
