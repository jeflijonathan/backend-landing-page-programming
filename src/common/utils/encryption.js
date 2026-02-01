const bcrypt = require("bcrypt");

const checkPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

module.exports = { checkPassword, hashPassword };
