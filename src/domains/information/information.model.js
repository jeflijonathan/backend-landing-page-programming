const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Information = sequelize.define(
        "Information",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            url_file: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            id_author: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "informations",
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    );

    Information.associate = (models) => {
        Information.belongsTo(models.UploadFile, { foreignKey: "url_file", as: "file" });
        Information.belongsTo(models.Post, { foreignKey: "id_author", as: "author" });
    };

    return Information;
};
