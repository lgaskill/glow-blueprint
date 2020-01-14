const mongoose = require("mongoose");

const pageViewSchema = new mongoose.Schema({
  pageId: String,
  pageName: String,
  date: Date,
  userId: String
});

pageViewSchema.pre("save", function (next) {
  this.date = Date.now();
  next();
});

module.exports = mongoose.model("PageView", pageViewSchema);
