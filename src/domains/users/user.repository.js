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

    async findByNpmOrEmail(npm, email) {
        const postWhere = {};
        if (npm) postWhere.npm = npm;
        if (email) postWhere.email = email;

        return await this.findOne({
            include: [{
                association: "post",
                where: postWhere,
                required: true
            }]
        });
    }

    async findById(id) {
        return await this.findByPk(id, {
            include: ["post"]
        });
    }
}

module.exports = UserRepository;
