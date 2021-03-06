const FileModel = require("../models/file");
const fs = require("fs");

const ALLOWED_IMG_TYPE_LOOKUP = {
  "image/jpg": true,
  "image/jpeg": true,
  "image/png": true,
  "image/gif": true
};

/**
 * GET image by id
 *
 * @param {String} id The requested image's ObjectId
 *
 * @todo This is not currently authenticated to allow image urls to be used without authentication params,
 *  Need to determine if this is ok going forward
 *
 */
exports.get = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Invalid image request");
  }

  let imageFile;
  try {
    imageFile = await FileModel.findOne({ _id: req.params.id });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Failed to get image");
  }

  if (!imageFile) {
    return res.status(404).send("Image not found");
  }

  res.writeHead(200, { "Content-Type": imageFile.contentType });
  res.end(imageFile.data, "binary");
};

// POST image
exports.create = async (req, res) => {
  if (!req.files || req.files.length !== 1) {
    return res.status(400).send("Invalid image request");
  }

  const file = req.files[0];

  const contentType = file.mimetype;
  if (!ALLOWED_IMG_TYPE_LOOKUP[contentType]) {
    return res.status(400).send("Image type " + contentType + " not allowed");
  }

  const imageFile = new FileModel();
  imageFile.contentType = contentType;
  imageFile.data = fs.readFileSync(file.path);
  imageFile.name = file.originalname;
  imageFile.blogPostId = req.params.blogPostId ? req.params.blogPostId : null;

  try {
    await imageFile.save();
    res.status(202).send({ _id: imageFile._id });
  } catch (err) {
    console.err(err);
    res.status(500).send("Failed to upload image");
  }
};

// DELETE image
exports.delete = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Invalid request");
  }

  let imageFile;
  try {
    imageFile = await FileModel.findOne({ _id: req.params.id }, { _id: 1 });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Invalid image");
  }

  if (!imageFile) {
    return res.status(404).send("Image not found");
  }

  try {
    await imageFile.remove().exec();
    res.status(204).send();
  } catch (err) {
    console.err(err);
    res.status(500).send("Failed to delete image");
  }
};
