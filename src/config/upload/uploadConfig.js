/**
 * Upload Configuration
 * Defines allowed file types and size limits for different upload scenarios
 */

const uploadConfigs = {
    // Image only uploads (e.g., profile pictures, thumbnails)
    image: {
        allowedTypes: ['jpeg', 'jpg', 'png', 'webp'],
        maxSize: 5 * 1024 * 1024, // 5MB
        compress: true
    },

    // Document only uploads (e.g., PDFs, reports)
    document: {
        allowedTypes: ['pdf'],
        maxSize: 10 * 1024 * 1024, // 10MB
        compress: true
    },

    // Mixed uploads - images and documents (default)
    mixed: {
        allowedTypes: ['jpeg', 'jpg', 'png', 'webp', 'pdf'],
        maxSizes: {
            image: 5 * 1024 * 1024,  // 5MB for images
            pdf: 10 * 1024 * 1024     // 10MB for PDFs
        },
        compress: true
    }
};

/**
 * Get upload configuration by type
 * @param {string} type - Configuration type (image, document, mixed)
 * @returns {object} Upload configuration
 */
function getUploadConfig(type = 'mixed') {
    return uploadConfigs[type] || uploadConfigs.mixed;
}

/**
 * Get max size for a specific file type
 * @param {string} fileType - File extension (jpeg, jpg, png, webp, pdf)
 * @param {object} config - Upload configuration
 * @returns {number} Max size in bytes
 */
function getMaxSizeForType(fileType, config) {
    if (config.maxSize) {
        return config.maxSize;
    }

    if (config.maxSizes) {
        const isImage = ['jpeg', 'jpg', 'png', 'webp'].includes(fileType);
        return isImage ? config.maxSizes.image : config.maxSizes.pdf;
    }

    return 10 * 1024 * 1024; // Default 10MB
}

module.exports = {
    uploadConfigs,
    getUploadConfig,
    getMaxSizeForType
};
