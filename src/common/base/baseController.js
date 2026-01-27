const { Router } = require("express");
const {
  StatusOk,
  StatusInternalServerError,
} = require("../consts/statusCodes");

class BaseController {
  router = Router();

  getRouter() {
    return this.router;
  }

  handleSuccess(res, data = {}, message = "Success", statusCode = StatusOk) {
    res.status(statusCode).json({
      status: "success",
      message,
      data,
    });
  }

  handleError(res, error) {
    const {
      statusCode = StatusInternalServerError,
      message = "Internal Server Error",
      details = null,
    } = error;
    res.status(statusCode).json({
      status: "error",
      message,
      details,
    });
  }
}

module.exports = BaseController;
