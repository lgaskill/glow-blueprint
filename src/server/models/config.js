const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  active: Boolean,
  coachingDesc: String,
  groupEnrollmentDesc: String,
  storyDesc: String,
  welcomeDesc: String,
  workDesc: String,
  disclamer: String,
  privacyPolicy: String,
  termsAndConditions: String,
});

module.exports = mongoose.model("Config", configSchema);
