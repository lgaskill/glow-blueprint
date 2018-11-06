var express = require("express");
var router = express.Router();

router.all("/#/*", function(req, res, next) {
  // Send the transpiled angular page for any routes under the hash
  res.sendFile("dist/index.html", { root: __dirname });
  log(req);
});

router.get("/get_stuff", function(req, res) {
  res.send("sup");
});

router.all("*", function(req, res) {
  res.status(404).send("LOL, wut");
});

module.exports = router;
