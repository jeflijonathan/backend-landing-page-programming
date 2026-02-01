const { CreateRoleDTO, UpdateRoleDTO } = require("./dto");

class RoleService {
    constructor(roleRepository) {
        this.roleRepo = roleRepository;
    }

    async createRole(payload) {
        await CreateRoleDTO.from(payload);
        return await this.roleRepo.create(payload);
    }

    async getAllRoles(query) {
        const { page = 1, limit = 10 } = query;
        const offset = (page - 1) * limit;

        const roles = await this.roleRepo.findAndCountAll({
            limit: parseInt(limit),
            offset: parseInt(offset),
        });

        return {
            data: roles.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: roles.count,
                total_pages: Math.ceil(roles.count / limit),
            }
        };
    }

    async getRoleById(id) {
        return await this.roleRepo.findByPk(id);
    }

    async updateRole(id, payload) {
        await UpdateRoleDTO.from(payload);
        await this.roleRepo.update(payload, { where: { id } });
        return await this.roleRepo.findByPk(id);
    }

    async deleteRole(id) {
        return await this.roleRepo.update({ deleted_at: new Date() }, { where: { id } });
    }
}

module.exports = RoleService;
