const BasePostgres = require("../../common/base/basePostgres");

class UploadFileRepository extends BasePostgres {
    constructor(model) {
        super(model);
    }
}

module.exports = UploadFileRepository;
