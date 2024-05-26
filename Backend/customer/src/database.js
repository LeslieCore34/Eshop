require("dotenv").config({ path: "../../.env" }); // Add this to ensure dotenv is loaded
const config = require("../../config");

// console.log("Current Working Directory:", process.cwd());
// console.log("Environment Variables in database.js:", process.env);

const { DB_USER, DB_HOST, DB_PASSWORD, DB_NAME, DB_PORT } = config;

console.log("DB_USER:", DB_USER);
console.log("DB_HOST:", DB_HOST);
console.log("DB_NAME:", DB_NAME);
console.log("DB_PORT:", DB_PORT);

const mysql = require("mysql2/promise");

const client = mysql.createPool({
  user: DB_USER,
  host: DB_HOST,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_NAME,
});

client
  .getConnection()
  .then((connection) => {
    console.info(`Using database ${process.env.CUSTOMERSERVICE_DBNAME}`);

    connection.release();
  })
  .catch((error) => {
    console.warn(
      "Warning:",
      "Failed to establish a database connection.",
      "Please check your database credentials in the .env file if you need a database access."
    );
    console.error("Error message:", error.message);
  });

module.exports = client;
