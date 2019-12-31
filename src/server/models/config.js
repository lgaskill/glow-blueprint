const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  active: Boolean,
  coachingDesc: String,
  groupEnrollmentDesc: String,
  storyDesc: String,
  welcomeDesc: String,
  workDesc: String
});

module.exports = mongoose.model("Config", configSchema);
