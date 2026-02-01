const jwt = require("jsonwebtoken");
const env = require("../../config/env/env");

const generateTokens = (payload) => {
    const accessToken = jwt.sign(payload, env.jwtSecret, {
        expiresIn: env.jwtAccessExpiration,
    });

    const refreshToken = jwt.sign(payload, env.jwtRefreshSecret, {
        expiresIn: env.jwtRefreshExpiration,
    });

    return { accessToken, refreshToken };
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, env.jwtSecret);
};

const verifyRefreshToken = (token) => {
    return jwt.verify(token, env.jwtRefreshSecret);
};

module.exports = { generateTokens, verifyAccessToken, verifyRefreshToken };
