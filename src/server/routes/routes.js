const express = require("express");

const auth = require("../services/auth");

const user = require("./user");
const blog = require("./blog");
const image = require("./image");
const config = require("./config");

const router = express.Router();

router.all("/#/*", auth.optional, (req, res) => {
  // Send the transpiled angular page for any routes under the hash
  res.sendFile("dist/index.html", { root: __dirname });
});

// User
router.post("/authenticate", auth.optional, user.authenticate);
router.post("/user", auth.optional, user.create);
router.get("/users", auth.required, user.getAll);

// Blog
router.get("/blog_post", auth.optional, blog.getAll);
router.get("/blog_post/:id", auth.optional, blog.get);
router.post("/blog_post", auth.required, auth.admin, blog.create);
router.patch("/blog_post/:id", auth.required, auth.admin, blog.update);

// Images
router.get("/image/:id", auth.optional, image.get);
router.post("/image", auth.optional, auth.admin, image.create);
router.post("/image/:id", auth.optional, auth.admin, image.delete);

// Config
router.get("/config", auth.optional, config.get);
router.post("/config", auth.required, auth.admin, config.create);
router.patch("/config/:id", auth.required, auth.admin, config.update);

router.get("/test", auth.optional, (req, res) => {
  res.status(200).send("Alive");
});

router.all("*", auth.optional, (req, res) => {
  res.status(404).send("LOL, wut");
});

module.exports = router;
