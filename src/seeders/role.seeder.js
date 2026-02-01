require("dotenv").config();
const PostgresDatabase = require("../config/databases/postgres");
const defineRoleModel = require("../domains/role/role.model");

const roles = [
    { name: "LEADER", status: true },
    { name: "COORDINATOR", status: true },
    { name: "SECRETARY", status: true },
    { name: "TREASURER", status: true },
    { name: "MEMBER", status: true },
];

const seedRoles = async () => {
    const db = new PostgresDatabase();
    const sequelize = db.getDbInstance();

    try {
        const Role = defineRoleModel(sequelize);
        await sequelize.sync({ alter: true });

        console.log("\n🌱 Seeding roles...");
        for (const role of roles) {
            const [created, isNew] = await Role.findOrCreate({
                where: { name: role.name },
                defaults: role,
            });
            console.log(`  ${isNew ? "✅ Created" : "⏭️ Exists"}: ${role.name}`);
        }

        console.log("\n🎉 Role seeding completed!");
        await db.close();
        process.exit(0);
    } catch (error) {
        console.error("❌ Role seeding failed:", error);
        await db.close();
        process.exit(1);
    }
};

seedRoles();
