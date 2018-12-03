const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  body: String,
  category: String,
  createdAt: Date,
  lastUpdatedAt: Date,
  mainImageId: String,
  title: String
});

blogPostSchema.pre("save", function(next) {
  let now = Date.now();

  // Generate dates
  this.lastUpdatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model("BlogPost", blogPostSchema);
