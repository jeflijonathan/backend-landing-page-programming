const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class UpdateInformationDTO extends BaseDTO {
    static schema = yup.object({
        title: yup.string().optional(),
        url_file: yup.string().uuid("url_file must be a valid UUID").optional(),
        id_author: yup.string().uuid("id_author must be a valid UUID").optional(),
        description: yup.string().optional(),
    });

    static async from(payload) {
        return super.from(payload, this.schema, UpdateInformationDTO);
    }
}

module.exports = { UpdateInformationDTO };
