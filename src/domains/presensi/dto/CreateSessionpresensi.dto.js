const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class CreateSessionPresensiDTO extends BaseDTO {
    static schema = yup.object({
        title: yup.string().required("title is required"),
        description: yup.string().optional(),
        open_at: yup.date().required("open_at is required"),
        close_at: yup.date().required("close_at is required"),
        is_participation_proof_required: yup.boolean().optional(),
        status: yup.number().required("status (FK) is required"),
        role_filter: yup.array().of(yup.string()).optional(), // For auto-populating participants
    });

    static async from(payload) {
        return super.from(payload, this.schema, CreateSessionPresensiDTO);
    }
}

module.exports = { CreateSessionPresensiDTO };
