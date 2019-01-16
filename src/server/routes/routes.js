const express = require("express");
const fs = require("fs");

const mongoService = require("../services/mongoService");
const BlogPostModel = require("../models/blogPost");
const FileModel = require("../models/file");
const UserModel = require("../models/user");

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

router.get("/test", function(req, res) {
  res.status(200).send("Alive");
});

router.get("/test_db", function(req, res) {
  validateRequest(req, res, async function valid() {
    res.status(200).send("Healthy");
  });
});

// Authentication
router.post("/authenticate", function(req, res) {
  validateRequest(req, res, async function valid() {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).send("No username/password provided");
      return;
    }

    // Get user by username
    let user;
    try {
      user = await UserModel.findOne({ username });
    } catch (err) {
      res.status(500).send("Failed to get user record");
      return;
    }

    if (user.password !== password) {
      res.status(401).send("Failed to authenticate user");
      return;
    }

    res.send(user);
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
// router.post("/blog_post", function(req, res) {
//   validateRequest(req, res, async function valid() {
//     const blogPost = req.body;
//     if (!blogPost || !blogPost.title || !blogPost.body || !blogPost.category) {
//       res.status(400).send("Invalid request format");
//       return;
//     }
//     try {
//       const created = await mongoService.insertBlogPost(blogPost);
//       created
//         ? res.status(202).send()
//         : res.status(500).send("Failed to create blog post");
//     } catch (err) {
//       console.error(err);
//       res.status(500).send("Failed to create blog posts");
//     }
//   });
// });

// PATCH blog post
// router.patch("/blog_post/:id", function(req, res) {
//   validateRequest(req, res, async function valid() {
//     const blogPostId = req.params.id;
//     const blogPostUpdate = req.body;
//     if (!blogPostId || !blogPostUpdate) {
//       res.status(400).send("Invalid request format");
//       return;
//     }

//     try {
//       // First, make sure the thing exists
//       const existingPost = await BlogPostModel.findOne({ _id: blogPostId });
//       if (!existingPost) {
//         res.status(400).send("Intended blog post not found");
//         return;
//       }

//       try {
//         const result = await BlogPostModel.update(
//           { _id: blogPostId },
//           blogPostUpdate
//         );
//         res.status(204).send();
//       } catch (err) {
//         res.status(500).send("Failed to update blog post");
//       }
//     } catch (err) {
//       console.log(err);
//       res.status(500).send("Failed to create blog posts");
//     }
//   });
// });

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

/**
 * POST image
 *
 * @param {String} blogPostId (Optional) the id to the associtated blog post
 */
// router.post("/image", function(req, res) {
//   validateRequest(req, res, async function() {
//     if (!req.files || req.files.length !== 1) {
//       res.status(400).send("Invalid image request");
//       return;
//     }

//     const file = req.files[0];

//     const contentType = file.mimetype;
//     if (!ALLOWED_IMG_TYPE_LOOKUP[contentType]) {
//       res.status(400).send("Image type " + contentType + " not allowed");
//       return;
//     }

//     const imageFile = new FileModel();
//     imageFile.contentType = contentType;
//     imageFile.data = fs.readFileSync(file.path);
//     imageFile.name = file.originalname;
//     imageFile.blogPostId = req.params.blogPostId ? req.params.blogPostId : null;

//     try {
//       await imageFile.save();
//       res.status(202).send({ _id: imageFile._id });
//     } catch (err) {
//       console.err(err);
//       res.status(500).send("Failed to upload image");
//     }
//   });
// });

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
