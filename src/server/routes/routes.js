const express = require("express");
const router = express.Router();

const mongoService = require("../services/mongoService");

router.all("/#/*", function(req, res, next) {
  // Send the transpiled angular page for any routes under the hash
  res.sendFile("dist/index.html", { root: __dirname });
});

router.get("/test_db", function(req, res) {
  validateApiKey(req, res, async function valid() {
    res.send("You're in!");
  });
});

router.post("/blog", function(req, res) {
  validateApiKey(req, res, async function valid() {
    res.send("You're in!");
  });
});

router.all("*", function(req, res) {
  res.status(404).send("LOL, wut");
});

async function validateApiKey(req, res, callback) {
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
