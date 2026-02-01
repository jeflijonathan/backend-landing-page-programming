const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class CreateUserDTO extends BaseDTO {
    static schema = yup.object({
        username: yup.string().required("username is required"),
        password: yup.string().required("password is required"),
        npm: yup.string().required("npm is required"),
        fullname: yup.string().required("fullname is required"),
        email: yup.string().email("invalid email").required("email is required"),
        date_of_birth: yup.date().required("date of birth is required"),
        phone_number: yup.string().required("phone number is required"),
        division_id: yup.number().required("division id is required"),
        profile_url: yup.string().required("profile url is required"),
        gander: yup.string().required("gander is required"),
        descriptions: yup.string().required("descriptions is required"),
        status: yup.boolean().required("status is required"),
        role: yup.array().of(yup.string()).optional(),
    });

    static async from(payload) {
        return super.from(payload, this.schema, CreateUserDTO);
    }
}

module.exports = { CreateUserDTO };
