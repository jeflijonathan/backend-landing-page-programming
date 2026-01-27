const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class UpdateUserDTO extends BaseDTO {
  static schema = yup.object({
    full_name: yup.string(),
    username: yup.string().max(100),
    email: yup.string().email(),
    password: yup.string().min(6),
    role: yup.string().oneOf(["user", "admin", "moderator"]),
    deleted_at: yup.date().nullable(),
  });

  static async from(payload) {
    return super.from(payload, this.schema, UpdateUserDTO);
  }
}

module.exports = UpdateUserDTO;
