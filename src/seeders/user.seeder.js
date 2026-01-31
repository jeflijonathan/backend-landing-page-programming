require("dotenv").config();
const PostgresDatabase = require("../config/databases/postgres");
const defineRoleModel = require("../domains/role/role.model");
const defineUserModel = require("../domains/users/user.model");
const definePostModel = require("../domains/users/post.model");
const defineRoleUserModel = require("../domains/role/roleUser.model");
const { hashPassword } = require("../common/utils/encryption");

const firstUser = {
    username: "admin",
    password: "admin123",
    npm: "000000000",
    fullname: "Administrator",
    email: "admin@example.com",
    date_of_birth: "2000-01-01",
    phone_number: "081234567890",
    profile_url: "/uploads/default-avatar.png",
    gander: "male",
    descriptions: "System Administrator",
    status: true,
};

const seedUser = async () => {
    const db = new PostgresDatabase();
    const sequelize = db.getDbInstance();

    try {
        const Role = defineRoleModel(sequelize);
        const Post = definePostModel(sequelize);
        const User = defineUserModel(sequelize);
        const RoleUser = defineRoleUserModel(sequelize);

        await sequelize.sync({ alter: true });

        console.log("\n🌱 Seeding first user...");
        const existingUser = await User.findOne({ where: { username: firstUser.username } });

        if (!existingUser) {
            const hashedPassword = await hashPassword(firstUser.password);

            const post = await Post.create({
                npm: firstUser.npm,
                fullname: firstUser.fullname,
                email: firstUser.email,
                date_of_birth: firstUser.date_of_birth,
                phone_number: firstUser.phone_number,
                profile_url: firstUser.profile_url,
                gander: firstUser.gander,
                descriptions: firstUser.descriptions,
                status: firstUser.status,
            });

            const user = await User.create({
                username: firstUser.username,
                password: hashedPassword,
                id_post: post.id,
            });

            const leaderRole = await Role.findOne({ where: { name: "LEADER" } });
            if (leaderRole) {
                await RoleUser.create({
                    id_role: leaderRole.id,
                    id_user: user.id,
                });
                console.log(`  ✅ Created user: ${firstUser.username} with role: LEADER`);
            } else {
                console.log(`  ⚠️ Created user: ${firstUser.username} (LEADER role not found, run role.seeder.js first)`);
            }
        } else {
            console.log(`  ⏭️ User already exists: ${firstUser.username}`);
        }

        console.log("\n🎉 User seeding completed!");
        await db.close();
        process.exit(0);
    } catch (error) {
        console.error("❌ User seeding failed:", error);
        await db.close();
        process.exit(1);
    }
};

seedUser();
