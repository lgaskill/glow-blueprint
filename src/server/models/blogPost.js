const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
  title: String,
  body: String,
  createdAt: Date,
  lastUpdatedAt: Date,
  category: String
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
