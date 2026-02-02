const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const StatusPresensiSession = sequelize.define(
        "StatusPresensiSession",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            tableName: "status_presesi_sessions",
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    );

    return StatusPresensiSession;
};
