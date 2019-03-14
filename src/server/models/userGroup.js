const mongoose = require("mongoose");

const userGroupValue = new mongoose.Schema({
  value: String,
  createdAt: Date,
  notes: String
});

const userGroupSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
    enum: ["USER", "EMAIL"]
  },
  values: {
    type: [userGroupValue],
    default: []
  },
  deprecated: {
    type: Boolean,
    default: false
  },
  notes: String,
  createdAt: Date,
  lastUpdatedAt: Date
});

userGroupSchema.pre("save", function(next) {
  let now = Date.now();

  // Generate dates
  this.lastUpdatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

userGroupSchema.pre("updateOne", function(next) {
  this.lastUpdatedAt = Date.now();
  next();
});

module.exports = mongoose.model("UserGroup", userGroupSchema);
