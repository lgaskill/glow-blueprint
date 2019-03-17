const express = require("express");

const auth = require("../services/auth");

const userRoutes = require("./userRoutes");
const userGroupRoutes = require("./userGroupRoutes");
const blogRoutes = require("./blogRoutes");
const imageRoutes = require("./imageRoutes");
const configRoutes = require("./configRoutes");

const router = express.Router();

router.all("/#/*", auth.optional, (req, res) => {
  // Send the transpiled angular page for any routes under the hash
  res.sendFile("dist/index.html", { root: __dirname });
});

//
// User
//
router.get("/users", auth.required, auth.admin, userRoutes.getAll);
router.post("/authenticate", auth.optional, userRoutes.authenticate);
router.post("/user", auth.optional, userRoutes.create);

//
// User Groups
//
router.get("/user_group", auth.required, auth.admin, userGroupRoutes.getAll);
router.get(
  "/user_group/:id",
  auth.required,
  auth.admin,
  userGroupRoutes.getById
);
router.post("/user_group", auth.required, auth.admin, userGroupRoutes.create);
router.patch(
  "/user_group/:id",
  auth.required,
  auth.admin,
  userGroupRoutes.update
);
router.delete("/user_group", auth.required, auth.admin, userGroupRoutes.delete);
router.put("/user_group/add/:id", auth.optional, userGroupRoutes.addValue);
router.put(
  "/user_group/remove/:id",
  auth.optional,
  userGroupRoutes.removeValue
);

//
// Blog
//
router.get("/blog_post", auth.optional, blogRoutes.getAll);
router.get("/blog_post/categories", auth.optional, blogRoutes.getCategories);
router.get("/blog_post/:id", auth.optional, blogRoutes.get);
router.post("/blog_post", auth.required, auth.admin, blogRoutes.create);
router.patch("/blog_post/:id", auth.required, auth.admin, blogRoutes.update);

//
// Images
//
router.get("/image/:id", auth.optional, imageRoutes.get);
router.post("/image", auth.optional, auth.admin, imageRoutes.create);
router.delete("/image/:id", auth.optional, auth.admin, imageRoutes.delete);

//
// Config
//
router.get("/config", auth.optional, configRoutes.get);
router.post("/config", auth.required, auth.admin, configRoutes.create);
router.patch("/config/:id", auth.required, auth.admin, configRoutes.update);

//
// Misc
//
router.get("/test", auth.optional, (req, res) => {
  res.status(200).send("Alive");
});
router.all("*", auth.optional, (req, res) => {
  res.status(404).send("LOL, wut");
});

module.exports = router;
