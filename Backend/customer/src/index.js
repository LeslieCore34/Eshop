const express = require("express");
const cors = require("cors");
const customerRouter = require("./api/customerRoutes"); // Votre fichier de routes

const app = express();

// Middlewares
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cors());

// Routes
app.use("/customers", customerRouter);

// Démarrer le service customer (exemple : port 3001)
app.listen(3001, () => {
  console.log("Customer Service listening on port 3001");
});
