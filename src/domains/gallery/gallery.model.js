const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Gallery = sequelize.define(
        "Gallery",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            id_post: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "posts",
                    key: "id",
                },
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            tableName: "galleries",
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    );

    Gallery.associate = (models) => {
        Gallery.belongsTo(models.Post, {
            foreignKey: "id_post",
            as: "post",
        });
        Gallery.hasMany(models.GalleryMedia, {
            foreignKey: "gallery_id",
            as: "gallery_media",
            onDelete: "CASCADE",
        });
    };

    return Gallery;
};
