const http = require("http");
const path = require("path");
const express = require("express");
const favicon = require("serve-favicon");
const fs = require("fs");
const bodyParser = require("body-parser");

const router = require("./src/server/routes/routes.js");
const mongoService = require("./src/server/services/mongoService.js");

const SERVER_PORT = process.env.PORT || 3000;

const log = function(entry) {
  fs.appendFileSync(
    "/tmp/the-glow-blueprint.log",
    new Date().toISOString() + " - " + entry + "\n"
  );
};

try {
  run();
} catch (err) {
  log("Failed to start server", err);
}

async function run() {
  const app = express();
  app.use(favicon(path.join(__dirname, "dist", "favicon.ico")));
  app.use(express.static(path.join(__dirname, "dist")));

  // Body Parser Config
  app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  app.use(bodyParser.json());

  // Initialize the router
  app.use("/", router);

  // Set the Port
  app.set("port", SERVER_PORT);

  // Initialize DB Client
  try {
    await mongoService.initClient();
  } catch (err) {
    console.error("Failed to connect to mongo instance", err);
    return;
  }

  const server = http.createServer(app);
  server.listen(SERVER_PORT);

  console.log("Server running at http://127.0.0.1:" + SERVER_PORT + "/");
}
