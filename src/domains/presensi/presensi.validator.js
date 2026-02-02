const { StatusBadRequest } = require("../../common/consts/statusCodes");

class PresensiValidator {
    static validateSessionDates(openAt, closeAt) {
        if (new Date(openAt) >= new Date(closeAt)) {
            throw {
                statusCode: StatusBadRequest,
                message: "Close date must be after open date",
            };
        }
    }

    static validateScanTime(session) {
        const now = new Date();
        if (now < new Date(session.open_at)) {
            throw {
                statusCode: StatusBadRequest,
                message: "Attendance session has not opened yet",
            };
        }
        if (now > new Date(session.close_at)) {
            throw {
                statusCode: StatusBadRequest,
                message: "Attendance session has closed",
            };
        }
    }
}

module.exports = PresensiValidator;
