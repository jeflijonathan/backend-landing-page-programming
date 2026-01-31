const BasePostgres = require("../../common/base/basePostgres");

class RoleRepository extends BasePostgres {
    constructor(model) {
        super(model);
    }
}

module.exports = RoleRepository;
