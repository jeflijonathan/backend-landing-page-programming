const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const PresensiSession = sequelize.define(
        "PresensiSession",
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
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            open_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            close_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            is_participation_proof_required: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
        {
            tableName: "presensi_sessions",
            timestamps: true,
            underscored: true,
            paranoid: true,
        }
    );

    PresensiSession.associate = (models) => {
        PresensiSession.belongsTo(models.StatusPresensiSession, {
            foreignKey: "status",
            as: "sessionStatus",
        });
        PresensiSession.hasMany(models.Presensi, {
            foreignKey: "id_presensi_sessions",
            as: "attendances",
        });
    };

    return PresensiSession;
};
