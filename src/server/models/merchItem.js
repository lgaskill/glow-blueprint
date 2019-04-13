const mongoose = require("mongoose");

const merchItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  sku: String,
  price: String,
  createdAt: Date,
  lastUpdatedAt: Date
});

merchItemSchema.pre("save", function(next) {
  let now = Date.now();

  // Generate dates
  this.lastUpdatedAt = now;
  if (!this.createdAt) {
    this.createdAt = now;
  }

  next();
});

module.exports = mongoose.model("MerchItem", merchItemSchema);
