const express = require('express');
const app = express();
require('dotenv').config();
var bodyParser = require("body-parser");

const addCurrentTime = function (req, res, next) {
  req.time = new Date().toString();
  next();
};

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/name", function (req, res) {
  var firstName = req.body.first;
  var lastName = req.body.last;
  const fullName = `${firstName} ${lastName}`;
  res.json({ name: fullName });
});

// Route with middleware function and final handler
app.get('/now', addCurrentTime, function (req, res) {
  res.json({ time: req.time });
});

app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});

app.get("/name", function (req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  const fullName = `${firstName} ${lastName}`;
  res.json({ name: fullName });
});

app.use(function middleware(req, res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  res.send("freecodecamp");
  next();
});
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/public", express.static(__dirname + "/public"));


app.get("/json", (req, res) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    response = "Hello json".toUpperCase();
  } else {
    response = "Hello json";
  }

  res.json({
    message: response
  });
});


module.exports = app;
