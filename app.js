const port = process.env.PORT || 3000;
const http = require("http");
const path = require("path");
const express = require("express");
const favicon = require("serve-favicon");
const fs = require("fs");

const router = require("./src/server/routes/routes.js");
const mongoService = require("./src/server/services/mongoService.js");

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

  // Initialize the router
  app.use("/", router);

  // Set the Port
  app.set("port", port);

  // Initialize DB Client
  await mongoService.initClient();

  const server = http.createServer(app);
  server.listen(port);

  console.log("Server running at http://127.0.0.1:" + port + "/");
}
