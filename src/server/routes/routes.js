const express = require("express");
const fs = require("fs");
const passport = require("passport");

const mongoService = require("../services/mongoService");
const auth = require("../services/auth");
const BlogPostModel = require("../models/blogPost");
const FileModel = require("../models/file");
const UserModel = require("../models/user");

require("../config/passport-config");

const router = express.Router();

const ALLOWED_IMG_TYPE_LOOKUP = {
  "image/jpg": true,
  "image/jpeg": true,
  "image/png": true,
  "image/gif": true
};

router.all("/#/*", auth.optional, (req, res) => {
  // Send the transpiled angular page for any routes under the hash
  res.sendFile("dist/index.html", { root: __dirname });
});

router.get("/test", auth.optional, (req, res) => {
  res.status(200).send("Alive");
});

router.get("/test_db", auth.optional, (req, res) => {
  validateRequest(req, res, async function valid() {
    res.status(200).send("Healthy");
  });
});

router.get("/test_auth", auth.required, (req, res) => {
  validateRequest(req, res, async function valid() {
    res.status(200).send("You're good");
  });
});

// Authentication
router.post("/authenticate", auth.optional, (req, res, next) => {
  validateRequest(req, res, async function valid() {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send("No username/password provided");
      return;
    }

    return passport.authenticate(
      "local",
      { session: false },
      (err, passportUser, info) => {
        if (err) {
          return next(err);
        }

        if (passportUser) {
          const user = passportUser;
          user.token = passportUser.generateJWT();

          return res.json({ user: user.toAuthJSON() });
        }

        return status(400).info;
      }
    )(req, res, next);
  });
});

// POST user
router.post("/user", auth.optional, (req, res) => {
  validateRequest(req, res, async function valid() {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      res.status(400).send("Invalid request format");
      return;
    }

    let user;
    try {
      user = new UserModel({ username, email });
    } catch (err) {
      res.status(400).send("Invalid user format");
    }

    user.setPassword(password);

    try {
      const created = await user.save();
      !!created
        ? res.status(202).send()
        : res.status(500).send("Failed to create user");
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to create blog posts");
    }
  });
});

// Get all users
// router.get("/users", function(req, res) {
//   validateRequest(req, res, async function valid() {
//     // TODO:
//     //      Authenticate username/password

//     // Get all users
//     let users;
//     try {
//       users = await UserModel.find({});
//     } catch (err) {
//       res.status(500).send("Failed to get user records");
//       return;
//     }

//     res.send(users);
//   });
// });

// GET all blog posts
router.get("/blog_post", auth.optional, (req, res) => {
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
router.get("/blog_post/:id", auth.optional, (req, res) => {
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
router.post("/blog_post", auth.required, (req, res) => {
  validateRequest(req, res, async function valid() {
    const blogPost = req.body;
    if (!blogPost || !blogPost.title || !blogPost.body || !blogPost.category) {
      res.status(400).send("Invalid request format");
      return;
    }

    let blogPostModel;
    try {
      blogPostModel = new BlogPostModel(blogPost);
    } catch (err) {
      res.status(400).send("Invalid blog post format");
    }

    try {
      const created = await blogPostModel.save();
      !!created
        ? res.status(202).send(created)
        : res.status(500).send("Failed to create blog post");
    } catch (err) {
      console.error(err);
      res.status(500).send("Failed to create blog posts");
    }
  });
});

// PATCH blog post
router.patch("/blog_post/:id", auth.required, (req, res) => {
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
 * @todo This is not currently authenticated to allow image urls to be used without authentication params,
 *  Need to determine if this is ok going forward
 *
 */
router.get("/image/:id", async function(req, res) {
  //validateRequest(req, res, async function() {
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
  //});
});

// POST image
router.post("/image", auth.optional, (req, res) => {
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

// DELETE image
router.post("/image/:id", auth.optional, (req, res) => {
  validateRequest(req, res, async function() {
    if (!req.params.id) {
      res.status(400).send("Invalid request");
      return;
    }

    let imageFile;
    try {
      imageFile = await FileModel.findOne({ _id: req.params.id }, { _id: 1 });
    } catch (err) {
      console.error(err);
      res.status(500).send("Invalid image");
      return;
    }

    if (!imageFile) {
      res.status(404).send("Image not found");
      return;
    }

    try {
      await imageFile.remove().exec();
      res.status(204).send();
    } catch (err) {
      console.err(err);
      res.status(500).send("Failed to delete image");
    }
  });
});

router.all("*", auth.optional, (req, res) => {
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
