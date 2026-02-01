const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class UpdateRoleDTO extends BaseDTO {
    static schema = yup.object({
        name: yup.string(),
        description: yup.string(),
        status: yup.boolean(),
        deleted_at: yup.date().nullable(),
    });

    static async from(payload) {
        return super.from(payload, this.schema, UpdateRoleDTO);
    }
}

module.exports = { UpdateRoleDTO };
