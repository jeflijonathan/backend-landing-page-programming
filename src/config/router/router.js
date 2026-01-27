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

  listen() {
    this.app.listen(this.port, this.host, () => {
      console.log(`🚀 Server running at http://${this.host}:${this.port}`);
    });
  }
}

module.exports = Router;
