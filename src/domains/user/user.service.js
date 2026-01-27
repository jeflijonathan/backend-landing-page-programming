const { v4: uuid } = require("uuid");
const { CreateUserDTO, UpdateUserDTO } = require("./dto");
const UserRepository = require("./user.repository");

class UserService {
  constructor(model) {
    this._userRepository = new UserRepository(model);
  }

  async getAllUsers() {
    try {
      const result = await this._userRepository.findAll();
      return result;
    } catch (error) {
      console.log("@UserService:getAllUsers:error", error);
      throw error;
    }
  }

  async createUser(payload) {
    try {
      const validPayload = await CreateUserDTO.from(payload);

      return await this._userRepository.createUser({
        id: uuid(),
        ...validPayload,
      });
    } catch (error) {
      console.log("@UserService:createUser:error", error?.message);
      throw error;
    }
  }

  async updateUser(id, payload) {
    try {
      const validPayload = await UpdateUserDTO.from(payload);

      return await this._userRepository.updateUser(id, validPayload);
    } catch (error) {
      console.log("@UserService:updateUser:error", error);
      throw error;
    }
  }
}

module.exports = UserService;
