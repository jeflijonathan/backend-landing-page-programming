const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            id_post: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "users",
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    );

    User.associate = (models) => {
        User.belongsTo(models.Post, { foreignKey: "id_post", as: "post" });
        User.hasMany(models.Auth, { foreignKey: "users_id", as: "tokens" });
    };

    return User;
};
