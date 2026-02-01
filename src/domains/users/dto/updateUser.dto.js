const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class UpdateUserDTO extends BaseDTO {
    static schema = yup.object({
        username: yup.string().max(100),
        password: yup.string().min(6),
        npm: yup.string(),
        fullname: yup.string(),
        email: yup.string().email("invalid email"),
        date_of_birth: yup.date(),
        phone_number: yup.string(),
        division_id: yup.number(),
        profile_url: yup.string(),
        gander: yup.string(),
        descriptions: yup.string(),
        status: yup.boolean(),
        role: yup.array().of(yup.string()),
        deleted_at: yup.date().nullable(),
    });

    static async from(payload) {
        return super.from(payload, this.schema, UpdateUserDTO);
    }
}

module.exports = { UpdateUserDTO };
