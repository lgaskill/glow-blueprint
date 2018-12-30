const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  isAdmin: Boolean,
  notes: String,
  createdAt: Date,
  lastUpdatedAt: Date
});

userSchema.pre("save", function(next) {
  let now = Date.now();

  // Generate dates
  this.lastUpdatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model("User", userSchema);
