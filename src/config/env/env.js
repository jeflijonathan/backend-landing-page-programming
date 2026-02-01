const dotenv = require("dotenv");
dotenv.config();

const env = {
  beHost: process.env.BE_HOST || "0.0.0.0",
  bePort: process.env.BE_PORT ? parseInt(process.env.BE_PORT, 10) : 3000,

  // Database (Postgres)
  dbHost: process.env.DB_HOST || "localhost",
  dbPort: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  dbUser: process.env.DB_USER || "postgres",
  dbPassword: process.env.DB_PASSWORD || "postgres",
  dbName: process.env.DB_NAME || "test",
  dbLogging: process.env.DB_LOGGING === "true" ? console.log : false,
  dbDialect: "postgres",

  // Redis
  redisHost: process.env.REDIS_HOST || "localhost",
  redisPort: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT, 10) : 6379,
  redisPassword: process.env.REDIS_PASSWORD || undefined,

  // TinyPNG
  tinyPngApiKey: process.env.TINYPNG_API_KEY || "",

  // JWT
  jwtSecret: process.env.JWT_SECRET || "secret",
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET || "refresh_secret",
  jwtAccessExpiration: process.env.JWT_ACCESS_EXPIRATION || "1h",
  jwtRefreshExpiration: process.env.JWT_REFRESH_EXPIRATION || "24h",
};

module.exports = env;
