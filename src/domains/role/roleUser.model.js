const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const RoleUser = sequelize.define(
        "RoleUser",
        {
            id_role: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            id_user: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            tableName: "role_user",
            timestamps: true,
            underscored: true,
        }
    );

    return RoleUser;
};
