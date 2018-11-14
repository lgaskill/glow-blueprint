const express = require("express");
const router = express.Router();

const mongo = require("../services/mongo");

router.all("/#/*", function(req, res, next) {
  // Send the transpiled angular page for any routes under the hash
  res.sendFile("dist/index.html", { root: __dirname });
  log(req);
});

router.get("/get_stuff", function(req, res) {
  res.send("sup");
});

router.get("/test_db", function(req, res) {
  const key = req.query.key;
  if (!key) {
    res.status(401).send("Failed to authenticate request");
    return;
  }

  mongo.validateApiKey(key).then(
    function success() {
      res.send("You're in!");
    },
    function error() {
      res.send("Frig-off!!!");
    }
  );
});

router.all("*", function(req, res) {
  res.status(404).send("LOL, wut");
});

module.exports = router;
