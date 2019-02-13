const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  active: Boolean,
  coachingDesc: String,
  storyDesc: String
});

module.exports = mongoose.model("Config", configSchema);
