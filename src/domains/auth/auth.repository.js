const BasePostgres = require("../../common/base/basePostgres");

class AuthRepository extends BasePostgres {
    constructor(model) {
        super(model);
    }

    async findToken(token) {
        return await this.findOne({ where: { id: token } });
    }

    async revokeToken(id) {
        return await this.delete({ where: { id } });
    }

    async revokeAllUserTokens(userId) {
        return await this.delete({ where: { users_id: userId } });
    }

    async findByUserId(userId) {
        return await this.findAll({ where: { users_id: userId } });
    }
}

module.exports = AuthRepository;
