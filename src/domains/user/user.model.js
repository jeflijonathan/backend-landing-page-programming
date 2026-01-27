const { Model, DataTypes } = require("sequelize");
const { timeStamps } = require("../../common/consts/dbField");
const { USER_ROLES } = require("../../common/consts/userRole");

class UserModel {
  constructor(sequelize) {
    this.model = UserModel.initModel(sequelize);
    return this.model;
  }

  static initModel(sequelize) {
    if (sequelize.models.User) {
      return sequelize.models.User;
    }

    return Model.init(
      {
        id: {
          type: DataTypes.CHAR(36),
          allowNull: false,
          primaryKey: true,
        },
        full_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
          unique: true,
          validate: { isEmail: true },
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        role: {
          type: DataTypes.ENUM(
            USER_ROLES.ADMIN,
            USER_ROLES.MODERATOR,
            USER_ROLES.USER,
          ),
          allowNull: false,
          defaultValue: USER_ROLES.USER,
        },
        ...timeStamps,
      },
      {
        sequelize,
        modelName: "User",
        tableName: "users",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
        paranoid: true,
        deletedAt: "deleted_at",
      },
    );
  }
}

module.exports = UserModel;
