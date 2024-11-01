var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const connection = require("./lib/conn");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/nightingale2", (req, res) => {
  connection.connect((err) => {
    if (err) console.log("err", err);

    let query = "SELECT * FROM nightingale2";

    connection.query(query, (err, data) => {
      if (err) console.log("err", err);

      console.log("nightingale2", data);

      res.json(data);
    });
  });
});

module.exports = app;
