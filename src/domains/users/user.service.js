const {
    StatusBadRequest,
} = require("../../common/consts/statusCodes");
const { hashPassword } = require("../../common/utils/encryption");
const { CreateUserDTO, UpdateUserDTO } = require("./dto");
const { Op } = require("sequelize");
const redisClient = require("../../config/cache/redis").getInstance();

class UserService {
    constructor(userRepository, postModel) {
        this.userRepo = userRepository;
        this.PostModel = postModel;
    }

    async createUser(payload) {
        await CreateUserDTO.from(payload);

        const existingUser = await this.userRepo.findByUsername(payload.username);
        if (existingUser) {
            throw {
                statusCode: StatusBadRequest,
                message: "Username already exists",
            };
        }

        const transaction = await this.userRepo.model.sequelize.transaction();

        try {
            const hashedPassword = await hashPassword(payload.password);

            const post = await this.PostModel.create(
                {
                    npm: payload.npm,
                    fullname: payload.fullname,
                    email: payload.email,
                    date_of_birth: payload.date_of_birth,
                    phone_number: payload.phone_number,
                    division_id: payload.division_id,
                    profile_id: payload.profile_url, // Map profile_url to profile_id
                    gander: payload.gander,
                    descriptions: payload.descriptions,
                    status: payload.status,
                    division: payload.division,
                },
                { transaction }
            );

            const user = await this.userRepo.create(
                {
                    username: payload.username,
                    password: hashedPassword,
                    id_post: post.id,
                },
                { transaction }
            );

            await transaction.commit();

            const result = user.toJSON();
            result.post = post.toJSON();
            delete result.password;

            return result;
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async getAllUsers(query) {
        const { page = 1, limit = 10, search, sort, role } = query;

        // Create an explicit key object with current values
        const keyParams = {
            page: parseInt(page),
            limit: parseInt(limit),
            search: search || null,
            sort: sort || null,
            role: role || null
        };
        const cacheKey = `users:${JSON.stringify(keyParams)}`;

        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }
        } catch (err) {
            throw {
                status: "Error",
                statusCode: StatusInternalServerError,
                message: "Internal server error",
            }
        }

        const offset = (page - 1) * limit;

        const where = {};
        if (search) {
            where[Op.or] = [
                { username: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const include = [{
            model: this.PostModel,
            as: "post",
            where: search ? {
                fullname: { [Op.iLike]: `%${search}%` }
            } : {},
            required: !!search
        }];

        if (search && where[Op.or]) {
            delete where[Op.or];
        }

        const users = await this.userRepo.findAndCountAll({
            where,
            include,
            limit,
            offset,
            order: sort ? [[sort, "ASC"]] : [["created_at", "DESC"]],
        });

        const cleanedUsers = users.rows.map(user => {
            const userJson = user.toJSON();
            delete userJson.password;
            return userJson;
        });

        const result = {
            data: cleanedUsers,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: users.count,
                total_pages: Math.ceil(users.count / limit),
            },
        };

        try {
            await redisClient.set(cacheKey, JSON.stringify(result), { EX: 60 });
        } catch (err) {
            throw {
                status: "Error",
                statusCode: StatusInternalServerError,
                message: "Internal server error",
            }
        }

        return result;
    }

    async getUserById(id) {
        const user = await this.userRepo.findByPk(id, {
            include: [{ model: this.PostModel, as: "post" }]
        });

        if (!user) return null;

        const userJson = user.toJSON();
        delete userJson.password;
        return userJson;
    }

    async updateUser(id, payload) {
        await UpdateUserDTO.from(payload);

        const transaction = await this.userRepo.model.sequelize.transaction();

        try {
            if (payload.password) {
                payload.password = await hashPassword(payload.password);
            }

            await this.userRepo.update(payload, { where: { id }, transaction });

            const user = await this.userRepo.findByPk(id);
            if (user && user.id_post) {
                const postFields = ['npm', 'fullname', 'email', 'date_of_birth', 'phone_number', 'division_id', 'profile_url', 'gander', 'descriptions', 'status', 'division'];
                const postPayload = {};
                postFields.forEach(field => {
                    if (payload[field] !== undefined) {
                        if (field === 'profile_url') {
                            postPayload['profile_id'] = payload[field];
                        } else {
                            postPayload[field] = payload[field];
                        }
                    }
                });

                if (Object.keys(postPayload).length > 0) {
                    await this.PostModel.update(postPayload, { where: { id: user.id_post }, transaction });
                }
            }

            await transaction.commit();

            return await this.getUserById(id);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async deleteUser(id) {
        return await this.userRepo.update({ deleted_at: new Date() }, { where: { id } });
    }
}

module.exports = UserService;
