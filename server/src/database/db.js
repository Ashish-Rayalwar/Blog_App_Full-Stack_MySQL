const { log } = require("console");
const sql = require("mysql");
require("dotenv").config();

let db = sql.createConnection({
  host: process.env.MYSQL_ADDON_HOST,
  database: process.env.MYSQL_ADDON_DB,
  user: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
});

db.connect((err) => {
  try {
    if (err) {
      console.log(err.message);
    }

    console.log("Connected to MySQL database!");
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = { db };
