const rateLimit = require('express-rate-limit');

/**
 * Global API Rate Limiter
 * Restricts requests to 5 per minute per IP address
 */
const apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per `windowMs`
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        status: "error",
        statusCode: 429,
        message: "Too many requests, please try again later."
    }
});

module.exports = apiLimiter;
