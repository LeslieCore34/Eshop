const express = require("express");
const cors = require("cors");
const customerRoutes = require("./api"); // Votre fichier de routes

const app = express();

// Middlewares
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cors());

// Routes
app.use("/customers", customerRoutes);

// Démarrer le service customer (exemple : port 3001)
app.listen(3001, () => {
  console.log("Customer service listening on port 3001");
});
