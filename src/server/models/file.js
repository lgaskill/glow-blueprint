const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  contentType: String,
  data: Buffer,
  name: String,
  blogPostId: String
});

module.exports = mongoose.model("File", fileSchema);
