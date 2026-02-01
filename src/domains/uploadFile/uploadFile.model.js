const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const UploadFile = sequelize.define(
        "UploadFile",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            url: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        {
            tableName: "upload_file",
            timestamps: true,
            underscored: true,
        }
    );

    return UploadFile;
};
