const mongoose = require("mongoose");
const fs = require("fs");

const DB_URL = process.env.DB_URL;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const URL = DB_USER
  ? `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_URL}/gb?retryWrites=true`
  : `mongodb://${DB_URL}/gb?retryWrites=true&authSource=admin&readPreference=primary&ssl=false`;

class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(URL, { useNewUrlParser: true });

      console.log("Sup mongo");
    } catch (err) {
      console.error("Mongo's on fire! " + err);
    }
  }
}

module.exports = new Database();
