let mongoose = require("mongoose");

let apiKeySchema = new mongoose.Schema({
  key: String
});

module.exports = mongoose.model("ApiKey", apiKeySchema);
