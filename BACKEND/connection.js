require("dotenv").config();
const mysql = require("mysql");

var connection = mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
connection.connect((err) => {
  if (!err) {
    console.log("database connected successfully");
  } else {
    console.log(err);
  }
});

module.exports = connection;
