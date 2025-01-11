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
app.use(express.json());

// Proxy configuration
const customerServiceProxy = createProxyMiddleware({
  target: "http://127.0.0.1:3001",
  on: {
    proxyReq: (proxyReq, req, res) => {
      console.log(`Proxying request2 to: ${req.url}`);
    },
    proxyRes: (proxyRes, req, res) => {
      res.status(500).send("Proxy error is the response");
    },
    error: (err, req, res) => {
      console.error("Proxy error:", err);
    },
  },
  changeOrigin: true,
  pathRewrite: {
    "^/customers": "",
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
app.use(
  "/customers",
  (req, res, next) => {
    console.log(`Proxying request to: ${req.url}`);
    next();
  },
  customerServiceProxy
);

app.use("/items", itemServiceProxy);

// Gestion des erreurs
app.use(HandleErrors);

const PORT = 3000;
// Démarrer l'API Gateway (exemple : port 3000)
app
  .listen(PORT, () => {
    console.info(`Server is listening on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Error:", err.message);
  });
