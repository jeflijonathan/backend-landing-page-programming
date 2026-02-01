const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Role = sequelize.define(
        "Role",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            tableName: "roles",
            timestamps: true,
            underscored: true,
        }
    );

    return Role;
};
