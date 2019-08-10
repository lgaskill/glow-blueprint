const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const purchaseHistoryItem = new mongoose.Schema({
  itemId: String,
  name: String,
  description: String,
  transactionId: String,
  createdAt: Date
});

const userSchema = new mongoose.Schema({
  username: String,
  hash: String,
  salt: String,
  firstName: String,
  lastName: String,
  email: String,
  isAdmin: Boolean,
  notes: String,
  createdAt: Date,
  lastUpdatedAt: Date,
  purchaseHistory: {
    type: [purchaseHistoryItem],
    default: []
  }
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

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

userSchema.methods.validatePassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  const token = {
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10)
  };

  if (this.isAdmin) {
    token.isAdmin = true;
  }

  return jwt.sign(token, "secret");
};

userSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    isAdmin: this.isAdmin,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model("User", userSchema);
