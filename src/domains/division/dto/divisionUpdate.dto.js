const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class UpdateDivisionDTO extends BaseDTO {
    static schema = yup.object({
        name: yup.string(),
        url_image: yup.string(),
        status: yup.boolean(),
        deleted_at: yup.date().nullable(),
    });

    static async from(payload) {
        return super.from(payload, this.schema, UpdateDivisionDTO);
    }
}

module.exports = { UpdateDivisionDTO };
