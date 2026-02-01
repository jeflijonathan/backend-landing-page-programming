const BasePostgres = require("../../common/base/basePostgres");

class DivisionRepository extends BasePostgres {
    constructor(model) {
        super(model);
    }
}

module.exports = DivisionRepository;
