const { Client } = require("pg");
const { db } = require("../config");
const { Helpers } = require("../utils");

class DB {
  constructor() {
    this.client = new Client({
      ...db,
    });
  }

  async connectToDB() {
    try {
      await this.client.connect();
      console.log(`[PMS_MNGT_SERVICE] Connected to DB: ${db.database}`);
    } catch (error) {
      error = Helpers.capitalize(error.message.toString());
      console.error("[PMS_MNGT_SERVICE]", error);
    }
  }

  async disconnectFromDB() {
    try {
      await this.client.end();
      console.log(`[PMS_MNGT_SERVICE] Disconnected from DB: ${db.database}`);
    } catch (error) {
      console.error("[PMS_MNGT_SERVICE]", Helpers.capitalize(error.toString()));
    }
  }
}

module.exports = new DB();
