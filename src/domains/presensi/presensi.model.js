const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Presensi = sequelize.define(
        "Presensi",
        {
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            id_post: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            id_presensi_sessions: {
                type: DataTypes.UUID,
                allowNull: false,
            },
            statusPresensi: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            image_url: {
                type: DataTypes.UUID, // Changed from STRING to UUID to match UploadFile.id
                allowNull: true,
            },
        },
        {
            tableName: "presensi",
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    );

    Presensi.associate = (models) => {
        Presensi.belongsTo(models.Post, { foreignKey: "id_post", as: "post" });
        Presensi.belongsTo(models.PresensiSession, {
            foreignKey: "id_presensi_sessions",
            as: "session",
        });
        Presensi.belongsTo(models.StatusPresensi, {
            foreignKey: "statusPresensi",
            as: "attendanceStatus",
        });
        // If image_url refers to UploadFile
        Presensi.belongsTo(models.UploadFile, {
            foreignKey: "image_url",
            targetKey: "id",
            as: "proofImage",
        });
    };

    return Presensi;
};
