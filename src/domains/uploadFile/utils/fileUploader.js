const multer = require('multer');
const sharp = require('sharp');
const { PDFDocument } = require('pdf-lib');
const path = require('path');
const fs = require('fs');
const { getUploadConfig, getMaxSizeForType } = require('../../../config/upload/uploadConfig');

const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}


function sanitizeFilename(filename) {
    return filename
        .replace(/[\/\\]/g, '')
        .replace(/[^a-zA-Z0-9._-]/g, '_')
        .replace(/_{2,}/g, '_')
        .toLowerCase();
}

function createUploadMiddleware(configType = 'mixed') {
    const config = getUploadConfig(configType);
    const storage = multer.memoryStorage();

    const maxSize = config.maxSize || Math.max(...Object.values(config.maxSizes || { default: 10 * 1024 * 1024 }));

    const upload = multer({
        storage: storage,
        limits: { fileSize: maxSize },
        fileFilter: (_, file, cb) => {
            const filetypes = new RegExp(config.allowedTypes.join('|'));
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase().replace('.', ''));

            if (!mimetype || !extname) {
                return cb(new Error(`Only allowed file types: ${config.allowedTypes.join(', ')}`));
            }

            cb(null, true);
        }
    });

    return upload;
}

async function compressPDF(buffer) {
    try {
        const pdfDoc = await PDFDocument.load(buffer);

        pdfDoc.setTitle('');
        pdfDoc.setAuthor('');
        pdfDoc.setSubject('');
        pdfDoc.setKeywords([]);
        pdfDoc.setProducer('');
        pdfDoc.setCreator('');

        const compressedPdfBytes = await pdfDoc.save({
            useObjectStreams: true,
            addDefaultPage: false,
            objectsPerTick: 50,
        });

        return Buffer.from(compressedPdfBytes);
    } catch (error) {
        console.error('PDF compression error:', error);

        return buffer;
    }
}

function createProcessFileMiddleware(configType = 'mixed') {
    const config = getUploadConfig(configType);

    return async (req, res, next) => {
        if (!req.file) return next();

        const fileExt = path.extname(req.file.originalname).toLowerCase();
        const fileType = fileExt.replace('.', '');
        const baseName = path.basename(req.file.originalname, fileExt);
        const sanitizedBaseName = sanitizeFilename(baseName);

        const filename = `${Date.now()}-${sanitizedBaseName}${fileExt}`;
        const outputPath = path.join(uploadDir, filename);

        try {
            const isImage = /\.(jpeg|jpg|png|webp)$/i.test(fileExt);
            const isPDF = /\.pdf$/i.test(fileExt);

            const fileSize = req.file.buffer.length;
            const maxSize = getMaxSizeForType(fileType, config);

            if (fileSize > maxSize) {
                const maxSizeMB = (maxSize / (1024 * 1024)).toFixed(0);
                throw new Error(`${isPDF ? 'PDF' : 'Image'} file size must not exceed ${maxSizeMB}MB`);
            }

            if (isImage && config.compress) {
                await sharp(req.file.buffer)
                    .resize(800)
                    .jpeg({ quality: 80 })
                    .toFile(outputPath);
            } else if (isPDF && config.compress) {
                const compressedBuffer = await compressPDF(req.file.buffer);
                await fs.promises.writeFile(outputPath, compressedBuffer);
            } else {
                await fs.promises.writeFile(outputPath, req.file.buffer);
            }

            req.file.filename = filename;
            req.file.path = outputPath;
            req.file.destination = uploadDir;

            next();
        } catch (error) {
            return next(error);
        }
    };
}

const upload = createUploadMiddleware('mixed');
const processFile = createProcessFileMiddleware('mixed');

module.exports = {
    upload,
    processFile,
    createUploadMiddleware,
    createProcessFileMiddleware
};
