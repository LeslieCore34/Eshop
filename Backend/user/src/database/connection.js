const { Sequelize } = require("sequelize");
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = require("../config");

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully on item.");
    await sequelize.sync(); // Appel pour synchroniser les modèles
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database on item:", error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
