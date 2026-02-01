const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class LoginDTO extends BaseDTO {
    static schema = yup.object({
        npm: yup.string().required("npm is required"),
        password: yup.string().required("password is required"),
    });

    static async from(payload) {
        return super.from(payload, this.schema, LoginDTO);
    }
}

module.exports = { LoginDTO };
