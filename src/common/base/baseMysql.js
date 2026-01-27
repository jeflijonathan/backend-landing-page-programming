class BaseMySQLService {
  /**
   * @param {import("sequelize").Model} model - Sequelize model
   */
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      return await this.model.create(data);
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param {Object} filter - { query: {}, sorter: { sort: 'column', order: 'ASC'|'DESC' } }
   * @param {Object} paginator - { page: number, limit: number }
   */
  async find(filter = { query: {}, sorter: null }, paginator) {
    try {
      const options = {
        where: filter.query,
      };

      if (paginator) {
        options.limit = paginator.limit;
        options.offset = paginator.limit * (paginator.page - 1);
      }

      if (filter.sorter) {
        options.order = [[filter.sorter.sort, filter.sorter.order]];
      }

      return await this.model.findAll(options);
    } catch (error) {
      throw error;
    }
  }

  async count(filter = { query: {} }) {
    try {
      return await this.model.count({ where: filter.query });
    } catch (error) {
      throw error;
    }
  }

  async findOne(filter = {}) {
    try {
      return await this.model.findOne({ where: filter });
    } catch (error) {
      throw error;
    }
  }

  async update(filter = {}, updateData = {}) {
    try {
      const where = typeof filter === "object" ? filter : { id: filter };

      const [affectedRows] = await this.model.update(updateData, { where });

      if (affectedRows === 0) return null;

      return await this.model.findOne({ where });
    } catch (error) {
      throw error;
    }
  }

  async delete(filter = {}) {
    try {
      const record = await this.model.findOne({ where: filter });
      if (record) {
        await record.destroy();
        return record;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseMySQLService;
