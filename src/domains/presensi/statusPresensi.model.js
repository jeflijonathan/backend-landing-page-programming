const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const StatusPresensi = sequelize.define(
        "StatusPresensi",
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
            tableName: "status_presensi",
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    );

    return StatusPresensi;
};
