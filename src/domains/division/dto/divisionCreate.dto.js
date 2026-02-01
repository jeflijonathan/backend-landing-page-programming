const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class DivisionCreateDTO extends BaseDTO {
    static schema = yup.object({
        name: yup.string().required("name is required"),
        url_image: yup.string().required("url_image is required"),
        status: yup.boolean().required("status is required"),
    });

    static async from(payload) {
        return super.from(payload, this.schema, DivisionCreateDTO);
    }
}

module.exports = { DivisionCreateDTO };
