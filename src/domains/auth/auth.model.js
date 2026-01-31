const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Auth = sequelize.define(
        "Auth",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            revoke: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            ip_address: {
                type: DataTypes.STRING,
            },
            device: {
                type: DataTypes.STRING,
            },
            users_id: {
                type: DataTypes.UUID,
                allowNull: false,
            },
        },
        {
            tableName: "jwt",
            timestamps: true,
            underscored: true,
            paranoid: true,
            deletedAt: 'deleted_at'
        }
    );

    Auth.associate = (models) => {
        Auth.belongsTo(models.User, { foreignKey: "users_id", as: "user" });
    };

    return Auth;
};
