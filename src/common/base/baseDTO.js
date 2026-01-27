class BaseDTO {
  constructor(data) {
    Object.assign(this, data);
  }

  /**
   * @param {object} payload
   * @param {object} schema
   * @param {class} DtoClass
   * @returns {Promise<BaseDTO>}
   */
  static async from(payload, schema, DtoClass) {
    try {
      const validated = await schema.validate(payload, {
        abortEarly: false,
        stripUnknown: true,
      });
      return new DtoClass(validated);
    } catch (error) {
      const formatted = error.inner.map((e) => ({
        field: e.path,
        message: e.message,
      }));
      throw formatted;
    }
  }
}

module.exports = BaseDTO;
