const BaseController = require("../../common/base/baseController");
const { StatusBadRequest } = require("../../common/consts/statusCodes");
const UserModel = require("./user.model");
const UserService = require("./user.service");

class UserController extends BaseController {
  constructor(config = {}) {
    super();
    this._userService = new UserService(new UserModel(config.sequelize));

    this.getAllUsers();
    this.createUser();
    this.updateUser();
  }

  getAllUsers() {
    this.router.get("/v1/users", async (req, res) => {
      try {
        const users = await this._userService.getAllUsers();
        this.handleSuccess(res, users, "Users retrieved successfully");
      } catch (error) {
        this.handleError(res, error);
      }
    });
  }

  createUser() {
    this.router.post("/v1/users", async (req, res) => {
      try {
        const user = await this._userService.createUser(req.body);
        this.handleSuccess(res, user, "User created successfully");
      } catch (error) {
        this.handleError(res, error);
      }
    });
  }

  updateUser() {
    this.router.put("/v1/users/:id", async (req, res) => {
      try {
        const user = await this._userService.updateUser(
          req.params.id,
          req.body,
        );
        this.handleSuccess(res, user, "User updated successfully");
      } catch (error) {
        this.handleError(res, error);
      }
    });
  }
}

module.exports = UserController;
