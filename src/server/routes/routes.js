const express = require("express");
const fs = require("fs");

const mongoService = require("../services/mongoService");
const BlogPostModel = require("../models/blogPost");
const FileModel = require("../models/file");

const router = express.Router();

const ALLOWED_IMG_TYPE_LOOKUP = {
  "image/jpg": true,
  "image/jpeg": true,
  "image/png": true,
  "image/gif": true
};

router.all("/#/*", function(req, res, next) {
  // Send the transpiled angular page for any routes under the hash
  res.sendFile("dist/index.html", { root: __dirname });
});

router.get("/test_db", function(req, res) {
  validateRequest(req, res, async function valid() {
    res.status(200).send("Healthy");
  });
});

// GET all blog posts
router.get("/blog_post", function(req, res) {
  validateRequest(req, res, async function valid() {
    try {
      const blogPosts = await mongoService.getBlogPosts();
      res.status(200).send(blogPosts);
    } catch (err) {
      res.status(500).send("Failed to get blog posts");
    }
  });
});

// GET blog post by id
router.get("/blog_post/:id", function(req, res) {
  validateRequest(req, res, async function valid() {
    if (!req.params.id) {
      res.status(400).send();
      return;
    }

    try {
      const blogPost = await BlogPostModel.findOne({ _id: req.params.id });
      res.status(200).send(blogPost);
    } catch (err) {
      res.status(500).send("Failed to get blog post " + id);
    }
  });
});

// POST blog post
router.post("/blog_post", function(req, res) {
  validateRequest(req, res, async function valid() {
    const blogPost = req.body;
    if (!blogPost || !blogPost.title || !blogPost.body || !blogPost.category) {
      res.status(400).send("Invalid request format");
      return;
    }
    try {
      const created = await mongoService.insertBlogPost(blogPost);
      created
        ? res.status(202).send()
        : res.status(500).send("Failed to create blog post");
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to create blog posts");
    }
  });
});

// PATCH blog post
router.patch("/blog_post/:id", function(req, res) {
  validateRequest(req, res, async function valid() {
    const blogPostId = req.params.id;
    const blogPostUpdate = req.body;
    if (!blogPostId || !blogPostUpdate) {
      res.status(400).send("Invalid request format");
      return;
    }

    try {
      // First, make sure the thing exists
      const existingPost = await BlogPostModel.findOne({ _id: blogPostId });
      if (!existingPost) {
        res.status(400).send("Intended blog post not found");
        return;
      }

      try {
        const result = await BlogPostModel.update(
          { _id: blogPostId },
          blogPostUpdate
        );
        res.status(204).send();
      } catch (err) {
        res.status(500).send("Failed to update blog post");
      }
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to create blog posts");
    }
  });
});

//
/**
 * GET image by id
 *
 * @param {String} id The requested image's ObjectId
 *
 */
router.get("/image/:id", function(req, res) {
  validateRequest(req, res, async function() {
    if (!req.params.id) {
      res.status(400).send("Invalid image request");
      return;
    }

    let imageFile;
    try {
      imageFile = await FileModel.findOne({ _id: req.params.id });
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to get image");
      return;
    }

    if (!imageFile) {
      res.status(404).send("Image not found");
      return;
    }

    res.writeHead(200, { "Content-Type": imageFile.contentType });
    res.end(imageFile.data, "binary");
  });
});

/**
 * POST image
 *
 * @param {String} blogPostId (Optional) the id to the associtated blog post
 */
router.post("/image", function(req, res) {
  validateRequest(req, res, async function() {
    if (!req.files || req.files.length !== 1) {
      res.status(400).send("Invalid image request");
      return;
    }

    const file = req.files[0];

    const contentType = file.mimetype;
    if (!ALLOWED_IMG_TYPE_LOOKUP[contentType]) {
      res.status(400).send("Image type " + contentType + " not allowed");
      return;
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
  });
});

router.all("*", function(req, res) {
  res.status(404).send("LOL, wut");
});

async function validateRequest(req, res, callback) {
  const key = req.query.key;
  if (!key) {
    res.status(401).send("Failed to authenticate request");
    return;
  }

  const isValid = await mongoService.validateApiKey(key);
  if (isValid) {
    if (callback && typeof callback === "function") {
      callback();
    }
  } else {
    res.status(401).send("Unauthorized");
  }
}

module.exports = router;
