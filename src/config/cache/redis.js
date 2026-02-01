const { createClient } = require("redis");
const env = require("../env/env");

class RedisClient {
    constructor() {
        this.client = createClient({
            url: `redis://${env.redisPassword ? `:${env.redisPassword}@` : ""}${env.redisHost}:${env.redisPort}`,
        });

        this.client.on("error", (err) => console.log("❌ Redis Client Error", err));

        this.connect();
    }

    async connect() {
        try {
            await this.client.connect();
            console.log("✅ Connected to Redis");
        } catch (err) {
            console.error("❌ Redis connection failed:", err);
        }
    }

    getInstance() {
        return this.client;
    }
}

module.exports = new RedisClient();
