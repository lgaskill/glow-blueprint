const http = require("http");
const path = require("path");
const express = require("express");
const multer = require("multer");
const favicon = require("serve-favicon");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require("./src/server/routes/routes.js");
const database = require("./src/server/services/database");

const SERVER_PORT = process.env.PORT || 8081;

const log = function(entry) {
  fs.appendFileSync(
    "/tmp/the-glow-blueprint.log",
    new Date().toISOString() + " - " + entry + "\n"
  );
};

try {
  run();
} catch (err) {
  log("Failed to start server" + err);
}

function run() {
  const app = express();
  app.use(favicon(path.join(__dirname, "dist", "favicon.ico")));
  app.use(express.static(path.join(__dirname, "dist")));

  // Initialize multer to handle uploads of multi-part files
  app.use(multer({ dest: "/tmp/uploads/" }).any());

  // CORS Config
  var whitelist = ["http://localhost:4200", "https://www.theglowblueprint.com"];
  var corsOptions = {
    origin: function(origin, callback) {
      var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
      callback(null, originIsWhitelisted);
    },
    credentials: true
  };
  app.use(cors(corsOptions));

  // Body Parser Config
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );

  app.use(bodyParser.json());

  // Initialize the router
  app.use("/", router);

  // Error Handling
  app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
      res.status(401).send("Who do you know here?");
    }
  });

  // Set the Port
  app.set("port", SERVER_PORT);

  const server = http.createServer(app);
  server.listen(SERVER_PORT);

  console.log("Server running at http://127.0.0.1:" + SERVER_PORT + "/");
}
