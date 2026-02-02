const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class UpdateGalleryDTO extends BaseDTO {
    static schema = yup.object({
        title: yup.string(),
        description: yup.string(),
        gallery_media: yup.array().of(
            yup.object({
                media_url: yup.string().uuid().required("media_url (upload_id) is required"),
                display_order: yup.number()
            })
        ).nullable()
    });

    static async from(payload) {
        return super.from(payload, this.schema, UpdateGalleryDTO);
    }
}

module.exports = { UpdateGalleryDTO };
