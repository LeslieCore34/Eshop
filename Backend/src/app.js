const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const cors = require("cors");

app.use(cors());

app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "http://mysite.com",
      "http://another-domain.com",
    ],
  })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

const router = require("./router");

app.use("/api", router);

const reactBuildPath = `${__dirname}/../../frontend/dist`;

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.static(reactBuildPath));

app.get("*", (req, res) => {
  res.sendFile(`${reactBuildPath}/index.html`);
});

module.exports = app;
