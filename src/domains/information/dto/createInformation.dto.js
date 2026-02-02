const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class CreateInformationDTO extends BaseDTO {
    static schema = yup.object({
        title: yup.string().required("title is required"),
        url_file: yup.string().uuid("url_file must be a valid UUID").required("url_file is required"),
        id_author: yup.string().uuid("id_author must be a valid UUID").required("id_author is required"),
        description: yup.string().required("description is required"),
    });

    static async from(payload) {
        return super.from(payload, this.schema, CreateInformationDTO);
    }
}

module.exports = { CreateInformationDTO };
