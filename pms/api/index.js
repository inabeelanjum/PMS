const express = require("express");
const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const { version, serviceName, root } = require("../config");
const routes = require("./routes");
const {
  ResponseHandler,
  Helpers,
} = require("../utils");

class API {
  constructor(app) {
    this.app = app;
  }

  configure() {
    this.applyConfigMiddleware();
    this.addHealthCheckRoute();
    this.addImagesRoute();
    this.addRoutes();
    this.addDefaultRoute();
    this.addErrorHandler();

    console.log("[PMS_MNGT_SERVICE] REST API server configured successfully");
  }

  applyConfigMiddleware() {
    this.app.use(
      morgan("[PMS_MNGT_SERVICE] :method :url :status :response-time ms")
    );
    this.app.use(cors());
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    this.app.disable("x-powered-by");
  }

  addHealthCheckRoute() {
    this.app.get("/pms/status", (req, res, next) => {
      res.status(200).json({
        status: "running",
        version,
        serviceName,
      });
    });
  }

  addImagesRoute() {
      this.app.use(
        "/public",
        express.static(path.join(root, "public/files"))
      );
  }

  addRoutes() {
    routes.userRouter(this.app);
    routes.productRouter(this.app);
    routes.customerRouter(this.app);
    routes.orderRouter(this.app);
  }

  addDefaultRoute() {
    this.app.use("*", (req, res, next) => {
      res.status(404).json({
        message: `Route ${req.baseUrl + req.path} not found`,
        status: "running",
        version,
        serviceName,
      });
    });
  }

  addErrorHandler() {
    this.app.use((err, req, res, next) => {
      err.message = Helpers.capitalize(err.message.toString());
      console.error("[PMS_MNGT_SERVICE]", err);

      return ResponseHandler.errorResponse(
        res,
        500,
        err.message || null,
        err.stacktrace
      );
    });
  }
}

module.exports = API;
