const { Sequelize } = require("sequelize");
const env = require("../env/env");

class MysqlDatabase {
  constructor() {
    this.dbInstance = new Sequelize(env.dbName, env.dbUser, env.dbPassword, {
      host: env.dbHost,
      port: env.dbPort,
      dialect: "mysql",
      logging: env.dbLogging,
    });

    this.authenticate();
  }

  async authenticate() {
    try {
      await this.dbInstance.authenticate();
      console.log("✅ Connected to MySQL");
    } catch (err) {
      throw new Error(`❌ MySQL connection error: ${err}`);
    }
  }

  getDbInstance() {
    return this.dbInstance;
  }

  async close() {
    await this.dbInstance.close();
  }
}

module.exports = MysqlDatabase;
