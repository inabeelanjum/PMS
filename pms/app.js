const express = require("express");
require("express-async-errors");
const { version, serviceName, port, apiRoot } = require("./config");
const { Helpers } = require("./utils");
const DB = require("./db");
const API = require("./api");

class App {
  constructor() {
    this.app = express();
    this.db = DB;
    this.api = new API(this.app);
    this.server = null;
  }

  async start() {
    try {
      await this.db.connectToDB();
      this.api.configure();
      this.run();

      return this.app;
    } catch (error) {
      console.error("[PMS_MNGT_SERVICE]", Helpers.capitalize(error.toString()));
      process.exit(0);
    }
  }

  run() {
    this.server = this.app.listen(port, () => {
      console.log(
        `[PMS_MNGT_SERVICE] Service ${serviceName}_v${version} is up and running at: [::]:${port}${apiRoot}`
      );
    });

  }

  async stop() {
    await this.db.disconnectFromDB();
    this.server.close(() => {
      console.log("[PMS_MNGT_SERVICE] API server is shutdown");
    });
  }
}

module.exports = new App();
