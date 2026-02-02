/**
 * Normalize phone number to start with 62
 * @param {string} phoneNumber
 * @returns {string}
 */
const normalizePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return phoneNumber;

    // Remove any non-digit characters except +
    let cleaned = phoneNumber.toString().replace(/[^0-9+]/g, '');

    // Replace +62 with 62
    if (cleaned.startsWith('+62')) {
        return cleaned.substring(1);
    }

    // Replace 08 with 628
    if (cleaned.startsWith('08')) {
        return '62' + cleaned.substring(1);
    }

    // If starts with 8, prefix with 62
    if (cleaned.startsWith('8')) {
        return '62' + cleaned;
    }

    return cleaned;
};

module.exports = { normalizePhoneNumber };
