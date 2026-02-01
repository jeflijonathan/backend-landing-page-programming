const { verifyAccessToken } = require("../common/utils/token");
const { StatusUnauthorized } = require("../common/consts/statusCodes");

/**
 * Authentication middleware to verify JWT token
 * Protects routes from unauthorized access
 */
const authMiddleware = async (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw {
                statusCode: StatusUnauthorized,
                message: "Access token is required"
            };
        }

        // Extract token (remove 'Bearer ' prefix)
        const token = authHeader.substring(7);

        // Verify token
        const decoded = verifyAccessToken(token);

        // Attach user info to request object
        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(StatusUnauthorized).json({
                status: "error",
                statusCode: StatusUnauthorized,
                message: "Invalid access token",
                details: null
            });
        }

        if (error.name === 'TokenExpiredError') {
            return res.status(StatusUnauthorized).json({
                status: "error",
                statusCode: StatusUnauthorized,
                message: "Access token has expired",
                details: null
            });
        }

        // Handle custom errors
        const statusCode = error.statusCode || StatusUnauthorized;
        return res.status(statusCode).json({
            status: "error",
            statusCode,
            message: error.message || "Authentication failed",
            details: error.details || null
        });
    }
};

module.exports = authMiddleware;
