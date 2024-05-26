require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const HandleErrors = require("../customer/src/utils/error-handlers");

const app = express();

// Middlewares
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cors());
app.use(express.static(__dirname + "/public"));

// Proxy configuration
const customerServiceProxy = createProxyMiddleware({
  target: "http://localhost:3001", // URL du service Customer
  changeOrigin: true,
  pathRewrite: {
    "^/customers": "", // Supprime /customers de la requête
  },
});

const itemServiceProxy = createProxyMiddleware({
  target: "http://localhost:3002", // URL du service Item
  changeOrigin: true,
  pathRewrite: {
    "^/items": "", // Supprime /items de la requête
  },
});

// Routes des microservices
app.use("/customers", customerServiceProxy);
app.use("/items", itemServiceProxy);

// Gestion des erreurs
app.use(HandleErrors);

// Démarrer l'API Gateway (exemple : port 3000)
app.listen(3000, () => {
  console.log("API Gateway listening on port 3000");
});
