const { Client } = require("pg");

const client = new Client({
  host: "localhost",
  port: "5432",
  user: "nightingale2",
  password: "nightingale2",
  database: "nightingale2",
});

client
  .connect()
  .then(() => console.log("Connect to PostgreSQL"))
  .catch((err) => console.log("Connection error", err.stack));

module.exports = client;
