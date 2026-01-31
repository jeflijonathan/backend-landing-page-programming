const { Sequelize } = require("sequelize");
const env = require("../env/env");

class PostgresDatabase {
    constructor() {
        this.dbInstance = new Sequelize(env.dbName, env.dbUser, env.dbPassword, {
            host: env.dbHost,
            port: env.dbPort,
            dialect: "postgres",
            logging: env.dbLogging,
        });

        this.authenticate();
    }

    async authenticate() {
        try {
            await this.dbInstance.authenticate();
            console.log("✅ Connected to PostgreSQL");
        } catch (err) {
            console.error("❌ PostgreSQL connection error:", err);
        }
    }

    getDbInstance() {
        return this.dbInstance;
    }

    async close() {
        await this.dbInstance.close();
    }
}

module.exports = PostgresDatabase;
