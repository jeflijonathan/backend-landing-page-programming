const BaseMySQLService = require("../../common/base/baseMysql");

class UserRepository extends BaseMySQLService {
  constructor(model) {
    super(model);
  }

  async findAll(where = {}) {
    return this.find(where);
  }

  async findById(id) {
    return this.findOne({ id });
  }

  async createUser(data) {
    return this.create(data);
  }

  async updateUser(id, data) {
    return this.update({ id }, data);
  }

  async deleteUser(id) {
    return this.delete({ id });
  }
}

module.exports = UserRepository;
