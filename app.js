var port = process.env.PORT || 3000;
var http = require("http");
var path = require("path");
var express = require("express");
var favicon = require("serve-favicon");

var app = express();

app.use(favicon(path.join(__dirname, "dist", "favicon.ico")));
app.use(express.static(path.join(__dirname, "dist")));

app.all("/*", function(req, res, next) {
  // Just send the index.html for other files to support HTML5Mode
  res.sendFile("dist/index.html", { root: __dirname });
});

app.set("port", port);

var server = http.createServer(app);

server.listen(port);

console.log("Server running at http://127.0.0.1:" + port + "/");
