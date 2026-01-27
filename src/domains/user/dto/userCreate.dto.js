const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class CreateUserDTO extends BaseDTO {
  static schema = yup.object({
    full_name: yup.string().required("full_name is required"),
    username: yup.string().required("username is required").max(100),
    email: yup.string().required("email is required").email(),
    password: yup.string().required("password is required").min(6),
    role: yup.string().oneOf(["user", "admin", "moderator"]).default("user"),
  });

  static async from(payload) {
    return super.from(payload, this.schema, CreateUserDTO);
  }
}

module.exports = CreateUserDTO;
