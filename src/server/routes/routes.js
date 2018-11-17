const express = require("express");
const router = express.Router();

const mongoService = require("../services/mongoService");
const blogPost = require("../models/blogPost");

router.all("/#/*", function(req, res, next) {
  // Send the transpiled angular page for any routes under the hash
  res.sendFile("dist/index.html", { root: __dirname });
});

router.get("/test_db", function(req, res) {
  validateRequest(req, res, async function valid() {
    res.send("Healthy");
  });
});

router.get("/blog_post", function(req, res) {
  validateRequest(req, res, async function valid() {
    try {
      const blogPosts = await mongoService.getBlogPosts();
      res.send(blogPosts);
    } catch (err) {
      res.status(500).send("Failed to get blog posts");
    }
  });
});

router.post("/blog_post", function(req, res) {
  validateRequest(req, res, async function valid() {
    if (!blogPost.schema.isValid(req.body)) {
      res.status(400).send("Invalid request format");
      return;
    }

    try {
      const created = await mongoService.insertBlogPost(req.body);
      created
        ? res.status(202).send()
        : res.status(500).send("Failed to create blog post");
    } catch (err) {
      console.log(err);
      res.status(500).send("Failed to create blog posts");
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
