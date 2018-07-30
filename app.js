var port = process.env.PORT || 3000;
var http = require("http");
var path = require("path");
var express = require("express");
var favicon = require("serve-favicon");

var app = express();

app.use(favicon(path.join(__dirname, "dist", "favicon.ico")));
app.use(express.static(path.join(__dirname, "dist")));

app.set("port", port);

var server = http.createServer(app);

server.listen(port);

console.log("Server running at http://127.0.0.1:" + port + "/");
