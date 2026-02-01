const yup = require("yup");
const BaseDTO = require("../../../common/base/baseDTO");

class CreateGalleryDTO extends BaseDTO {
    static schema = yup.object({
        title: yup.string().required("title is required"),
        description: yup.string().required("description is required"),
        id_post: yup.string().uuid().required("id_post is required"),
        gallery_media: yup.array().of(
            yup.object({
                media_url: yup.string().uuid().required("media_url (upload_id) is required"),
                display_order: yup.number().default(1)
            })
        ).nullable()
    });

    static async from(payload) {
        return super.from(payload, this.schema, CreateGalleryDTO);
    }
}

module.exports = { CreateGalleryDTO };
