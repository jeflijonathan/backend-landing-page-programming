const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class UpdateSessionPresensiDTO extends BaseDTO {
    static schema = yup.object({
        title: yup.string().optional(),
        description: yup.string().optional(),
        open_at: yup.date().optional(),
        close_at: yup.date().optional(),
        is_participation_proof_required: yup.boolean().optional(),
        status: yup.number().optional(),
    });

    static async from(payload) {
        return super.from(payload, this.schema, UpdateSessionPresensiDTO);
    }
}

module.exports = { UpdateSessionPresensiDTO };
