const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Post = sequelize.define(
        "Post",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            npm: {
                type: DataTypes.STRING(10),
                unique: true,
                allowNull: false,
            },
            fullname: {
                type: DataTypes.STRING,
            },
            email: {
                type: DataTypes.STRING,
                unique: true,
            },
            date_of_birth: {
                type: DataTypes.DATEONLY,
            },
            phone_number: {
                type: DataTypes.STRING,
            },
            division_id: {
                type: DataTypes.INTEGER,
            },
            // Changed from raw string URL to Foreign Key
            profile_id: {
                type: DataTypes.UUID,
                references: {
                    model: "upload_file",
                    key: "id",
                },
            },
            gander: {
                type: DataTypes.STRING, // Changed from ENUM('L', 'P') to STRING to handle existing 'male' data in DB
            },
            descriptions: {
                type: DataTypes.TEXT,
            },
            status: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },
            division: {
                type: DataTypes.JSON,
            },
        },
        {
            tableName: "posts",
            timestamps: true,
            underscored: true,
        }
    );

    Post.associate = (models) => {
        Post.belongsTo(models.UploadFile, {
            foreignKey: "profile_id",
            as: "profile_image",
        });
    };

    return Post;
};
