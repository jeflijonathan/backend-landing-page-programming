const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class CreateRoleDTO extends BaseDTO {
    static schema = yup.object({
        name: yup.string().required("name is required"),
        description: yup.string(),
        status: yup.boolean().default(true),
    });

    static async from(payload) {
        return super.from(payload, this.schema, CreateRoleDTO);
    }
}

module.exports = { CreateRoleDTO };
