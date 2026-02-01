const {
    StatusBadRequest,
    StatusOk,
} = require("../../common/consts/statusCodes");
const { hashPassword } = require("../../common/utils/encryption");
const { CreateUserDTO, UpdateUserDTO } = require("./dto");
const BaseDTO = require("../../common/base/baseDTO");
const { Op } = require("sequelize");

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
                    profile_url: payload.profile_url,
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

        return {
            data: users.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: users.count,
                total_pages: Math.ceil(users.count / limit),
            },
        };
    }

    async getUserById(id) {
        return await this.userRepo.findByPk(id, {
            include: [{ model: this.PostModel, as: "post" }]
        });
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
                        postPayload[field] = payload[field];
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
