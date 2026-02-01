const {
    StatusUnauthorized,
} = require("../../common/consts/statusCodes");
const {
    checkPassword,
} = require("../../common/utils/encryption");
const { generateTokens, verifyRefreshToken } = require("../../common/utils/token");
const { LoginDTO } = require("./dto/login.dto");

class AuthService {
    constructor(userRepository, authRepository) {
        this.userRepo = userRepository;
        this.authRepo = authRepository;
    }

    async login(payload) {
        await LoginDTO.from(payload);

        // Login only using NPM
        const { npm, password } = payload;

        const user = await this.userRepo.findByNpmOrEmail(npm, null);

        if (!user) {
            throw {
                statusCode: StatusUnauthorized,
                message: "Invalid credentials",
            };
        }

        const isMatch = await checkPassword(password, user.password);
        if (!isMatch) {
            throw {
                statusCode: StatusUnauthorized,
                message: "Invalid username or password",
            };
        }

        const tokens = generateTokens({ id: user.id, username: user.username });

        await this.authRepo.create({
            users_id: user.id,
            ip_address: "",
            device: "",
        });

        const userData = user.toJSON();
        delete userData.password;

        return {
            ...userData,
            token: tokens.accessToken,
            refresh_token: tokens.refreshToken,
        };
    }

    async refreshToken(payload) {
        const { refresh_token } = payload;

        if (!refresh_token) {
            throw {
                statusCode: StatusUnauthorized,
                message: "Refresh token is required",
            };
        }

        try {
            const decoded = verifyRefreshToken(refresh_token);
            const user = await this.userRepo.findByPk(decoded.id);

            if (!user) {
                throw {
                    statusCode: StatusUnauthorized,
                    message: "User not found",
                };
            }

            const tokens = generateTokens({ id: user.id, username: user.username });

            return {
                token: tokens.accessToken,
                refresh_token: tokens.refreshToken,
            };
        } catch (error) {
            throw {
                statusCode: StatusUnauthorized,
                message: "Invalid or expired refresh token",
            };
        }
    }

    async logout(userId) {
        await this.authRepo.revokeAllUserTokens(userId);
        return { message: "User Successfully Logged Out" };
    }

    async getAllSessions(userId) {
        return await this.authRepo.findAll({
            where: { users_id: userId }
        });
    }

    async revokeSession(sessionId) {
        return await this.authRepo.revokeToken(sessionId);
    }
}

module.exports = AuthService;
