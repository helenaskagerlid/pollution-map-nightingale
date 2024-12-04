var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

const supabase = require("./supabase");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.get("/nightingale2", async (req, res) => {
  const { data, error } = await supabase.from("nightingale2").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return res.status(500).send("Database query error");
  }

  res.json(data);
});

app.get("/nightingale1", async (req, res) => {
  const { data, error } = await supabase.from("nightingale1").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return res.status(500).send("Database query error");
  }

  res.json(data);
});

app.get("/nightingaleChart", async (req, res) => {
  const { data, error } = await supabase.from("nightingaleChart").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return res.status(500).send("Database query error");
  }
  res.json(data);
});

app.get("/nightingaleMap", async (req, res) => {
  const { data, error } = await supabase.from("nightingaleMap").select("*");

  if (error) {
    console.error("Error fetching data:", error);
    return res.status(500).send("Database query error");
  }

  res.json(data);
});

// app.get("/nightingale2", (req, res) => {
//   let query = "SELECT * FROM nightingale2";

//   client.query(query, (err, data) => {
//     if (err) {
//       console.error("Query error:", err);
//       res.status(500).send("Database query error");
//       return;
//     }
//     res.json(data.rows);
//   });
// });

// app.get("/nightingale1", (req, res) => {
//   let query = "SELECT * FROM nightingale1";

//   client.query(query, (err, data) => {
//     if (err) {
//       console.error("Query error:", err);
//       res.status(500).send("Database query error");
//       return;
//     }
//     res.json(data.rows);
//   });
// });

// app.get("/nightingaleChart", (req, res) => {
//   let query = "SELECT * FROM nightingaleChart";

//   client.query(query, (err, data) => {
//     if (err) {
//       console.error("Query error:", err);
//       res.status(500).send("Database query error");
//       return;
//     }
//     res.json(data.rows);
//   });
// });

// app.get("/nightingaleMap", (req, res) => {
//   let query = "SELECT * FROM nightingaleMap";

//   client.query(query, (err, data) => {
//     if (err) {
//       console.error("Query error:", err);
//       res.status(500).send("Database query error");
//       return;
//     }
//     res.json(data.rows);
//   });
// });

module.exports = app;

// const express = require("express");
// const path = require("path");
// const cookieParser = require("cookie-parser");
// const logger = require("morgan");
// const cors = require("cors");
// const serverless = require("serverless-http");

// const client = require("./lib/conn");

// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");

// var app = express();

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(cors());

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// app.get("/nightingale2", (req, res) => {
//   let query = "SELECT * FROM nightingale2";

//   client.query(query, (err, data) => {
//     if (err) {
//       console.error("Query error:", err);
//       res.status(500).send("Database query error");
//       return;
//     }
//     res.json(data.rows);
//   });
// });

// app.get("/nightingale1", (req, res) => {
//   let query = "SELECT * FROM nightingale1";

//   client.query(query, (err, data) => {
//     if (err) {
//       console.error("Query error:", err);
//       res.status(500).send("Database query error");
//       return;
//     }
//     res.json(data.rows);
//   });
// });

// app.get("/nightingaleChart", (req, res) => {
//   let query = "SELECT * FROM nightingaleChart";

//   client.query(query, (err, data) => {
//     if (err) {
//       console.error("Query error:", err);
//       res.status(500).send("Database query error");
//       return;
//     }
//     res.json(data.rows);
//   });
// });

// app.get("/nightingaleMap", (req, res) => {
//   let query = "SELECT * FROM nightingaleMap";

//   client.query(query, (err, data) => {
//     if (err) {
//       console.error("Query error:", err);
//       res.status(500).send("Database query error");
//       return;
//     }
//     res.json(data.rows);
//   });
// });

// if (require.main === module) {
//   const port = process.env.PORT || 3000;
//   app.listen(port, () => {
//     console.log(`Server running on http://localhost:${port}`);
//   });
// }

// module.exports.handler = serverless(app);
