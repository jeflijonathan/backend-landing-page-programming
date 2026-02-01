const BasePostgres = require("../../common/base/basePostgres");

class GalleryRepository extends BasePostgres {
    constructor(model) {
        super(model);
    }

    async findById(id) {
        return await this.findByPk(id, {
            include: [
                {
                    association: "gallery_media",
                    include: ["media"]
                },
                "post"
            ]
        });
    }

    async findAllGalleries(query) {
        return await this.findAndCountAll(query);
    }
}

module.exports = GalleryRepository;
