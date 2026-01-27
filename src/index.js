const MysqlDatabase = require("./config/databases/mysql");
const Router = require("./config/router/router");
const UserController = require("./domains/user/user.controller");

const mysqlDb = new MysqlDatabase();
const sequelize = mysqlDb.getDbInstance();

const server = new Router();

server.app.use("/api", new UserController({ sequelize }).getRouter());

(async () => {
  try {
    await sequelize.sync();
    console.log("✅ Database synced");

    server.listen();
  } catch (err) {
    console.error("❌ Sync error:", err);
  }
})();
