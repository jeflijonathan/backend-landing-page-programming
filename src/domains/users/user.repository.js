const BasePostgres = require("../../common/base/basePostgres");

class UserRepository extends BasePostgres {
    constructor(model) {
        super(model);
    }

    async findByUsername(username) {
        return await this.findOne({
            where: { username },
            include: ["post"]
        });
    }

    async findById(id) {
        return await this.findByPk(id, {
            include: ["post"]
        });
    }
}

module.exports = UserRepository;
