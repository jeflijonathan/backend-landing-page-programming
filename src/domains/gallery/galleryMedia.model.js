const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const GalleryMedia = sequelize.define(
        "GalleryMedia",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            gallery_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "galleries",
                    key: "id",
                },
            },
            media_url: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "upload_file",
                    key: "id",
                },
            },
            display_order: {
                type: DataTypes.INTEGER,
                defaultValue: 1,
            },
        },
        {
            tableName: "gallery_media",
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    );

    GalleryMedia.associate = (models) => {
        GalleryMedia.belongsTo(models.Gallery, {
            foreignKey: "gallery_id",
            as: "gallery",
        });
        GalleryMedia.belongsTo(models.UploadFile, {
            foreignKey: "media_url",
            as: "media",
        });
    };

    return GalleryMedia;
};
