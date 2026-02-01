const redisClient = require("../../config/cache/redis").getInstance();
const { CreateGalleryDTO, UpdateGalleryDTO } = require("./dto");

class GalleryService {
    constructor(galleryRepository, galleryMediaModel) {
        this.galleryRepo = galleryRepository;
        this.GalleryMediaModel = galleryMediaModel;
    }

    async createGallery(payload) {
        await CreateGalleryDTO.from(payload);

        const transaction = await this.galleryRepo.model.sequelize.transaction();

        try {
            const gallery = await this.galleryRepo.create(
                {
                    title: payload.title,
                    description: payload.description,
                    id_post: payload.id_post,
                },
                { transaction }
            );

            if (payload.gallery_media && payload.gallery_media.length > 0) {
                const mediaItems = payload.gallery_media.map(item => ({
                    gallery_id: gallery.id,
                    media_url: item.media_url,
                    display_order: item.display_order
                }));

                await this.GalleryMediaModel.bulkCreate(mediaItems, { transaction });
            }

            await transaction.commit();

            return await this.getGalleryById(gallery.id);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async getAllGalleries(query) {
        const { page = 1, limit = 10, search } = query;

        const keyParams = {
            page: parseInt(page),
            limit: parseInt(limit),
            search: search || null
        };
        const cacheKey = `galleries:${JSON.stringify(keyParams)}`;

        try {
            const cachedData = await redisClient.get(cacheKey);
            if (cachedData) {
                return JSON.parse(cachedData);
            }
        } catch (err) {
            console.error("Redis get error:", err);
        }

        const offset = (page - 1) * limit;
        const where = {};
        if (search) {
            where.title = { [this.galleryRepo.model.sequelize.Op.iLike]: `%${search}%` };
        }

        const galleries = await this.galleryRepo.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: parseInt(offset),
            include: [
                {
                    association: "gallery_media",
                    include: ["media"]
                }
            ],
            distinct: true,
            order: [["created_at", "DESC"]]
        });

        const result = {
            data: galleries.rows,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total: galleries.count,
                total_pages: Math.ceil(galleries.count / limit),
            }
        };

        try {
            await redisClient.set(cacheKey, JSON.stringify(result), { EX: 60 });
        } catch (err) {
            console.error("Redis set error:", err);
        }

        return result;
    }

    async getGalleryById(id) {
        return await this.galleryRepo.findById(id);
    }

    async updateGallery(id, payload) {
        await UpdateGalleryDTO.from(payload);

        const transaction = await this.galleryRepo.model.sequelize.transaction();

        try {
            await this.galleryRepo.update(payload, { where: { id }, transaction });

            if (payload.gallery_media) {

                await this.GalleryMediaModel.destroy({ where: { gallery_id: id }, transaction });

                if (payload.gallery_media.length > 0) {
                    const mediaItems = payload.gallery_media.map(item => ({
                        gallery_id: id,
                        media_url: item.media_url,
                        display_order: item.display_order
                    }));
                    await this.GalleryMediaModel.bulkCreate(mediaItems, { transaction });
                }
            }

            await transaction.commit();
            return await this.getGalleryById(id);
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async deleteGallery(id) {
        return await this.galleryRepo.update({ deleted_at: new Date() }, { where: { id } });
    }
}

module.exports = GalleryService;
