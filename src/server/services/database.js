let mongoose = require("mongoose");

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;

const URL = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0-1z9rk.mongodb.net/gb?retryWrites=true`;

class Database {
  constructor() {
    this._connect();
  }

  async _connect() {
    try {
      await mongoose.connect(
        URL,
        { useNewUrlParser: true }
      );
    } catch (err) {
      console.error("Mongo's on fire! " + err);
    }

    console.log("Sup mongo");
  }
}

module.exports = new Database();
