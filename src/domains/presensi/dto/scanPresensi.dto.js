const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class ScanPresensiDTO extends BaseDTO {
    static schema = yup.object({
        id_presensi_sessions: yup.string().uuid("invalid session id").required("session id is required"),
        id_post: yup.string().uuid("invalid post id").required("post id is required"),
        statusPresensi: yup.number().optional(),
        description: yup.string().optional(),
        image_url: yup.string().optional(),
    });

    static async from(payload) {
        return super.from(payload, this.schema, ScanPresensiDTO);
    }
}

module.exports = { ScanPresensiDTO };
