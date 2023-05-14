const sql = require("mysql");
require("dotenv").config();
const password = process.env.password;
const db = sql.createConnection({
  host: "localhost",
  user: "root",
  password: password,
  database: "blog",
});

db.connect((err) => {
  if (err) throw err.message;

  console.log("Connected to MySQL database!");
});

module.exports = { db };
