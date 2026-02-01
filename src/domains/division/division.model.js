const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Division = sequelize.define(
        "Division",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            url_image: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
        },
        {
            tableName: "divisions",
            timestamps: true,
            underscored: true,
        }
    );

    return Division;
};
