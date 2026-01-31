const express = require("express");
const env = require("../env/env");

class Router {
  constructor() {
    this.app = express();

    this.host = env.beHost;
    this.port = env.bePort;

    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    this.app.get("/api/health-check", (_, res) => {
      res.status(200).json({ status: "OK", message: "Health check passed" });
    });
  }

  setupErrorHandler() {
    // 404 handler
    this.app.use((req, res, next) => {
      res.status(404).json({
        status: "error",
        statusCode: 404,
        message: "Route not found",
        details: null
      });
    });

    // Global error handler
    this.app.use((err, req, res, next) => {
      // Handle Multer errors
      if (err.name === 'MulterError') {
        let message = 'File upload error';
        if (err.code === 'LIMIT_FILE_SIZE') {
          message = 'File size too large. Maximum allowed size is 10MB';
        } else if (err.code === 'LIMIT_FILE_COUNT') {
          message = 'Too many files uploaded';
        } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
          message = 'Unexpected file field';
        }

        return res.status(400).json({
          status: "error",
          statusCode: 400,
          message,
          details: err.message
        });
      }

      // Handle custom errors from file uploader
      if (err.message && (err.message.includes('file size') || err.message.includes('allowed'))) {
        return res.status(400).json({
          status: "error",
          statusCode: 400,
          message: err.message,
          details: null
        });
      }

      // Handle other errors
      const statusCode = err.statusCode || 500;
      const message = err.message || 'Internal Server Error';

      res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        details: err.details || null
      });
    });
  }

  listen() {
    this.app.listen(this.port, this.host, () => {
      console.log(`🚀 Server running at http://${this.host}:${this.port}`);
    });
  }
}

module.exports = Router;
