const express = require("express");
const cors = require("cors");
const router = express.Router();
const UserService = require("../services/customer-services");

const corsOrigin = "http://localhost:3001";
router.use(
  cors({
    origin: [corsOrigin],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const service = new UserService();

router.post("/register", async (req, res, next) => {
  try {
    const {
      name,
      lastname,
      email,
      password,
      street,
      postcode,
      city,
      telephone,
    } = req.body;
    const data = await service.SignUp({
      name,
      lastname,
      email,
      password,
      street,
      postcode,
      city,
      telephone,
    });
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const data = await service.SignIn({ email, password });
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get("/profile", async (req, res, next) => {
  try {
    const { _id } = req.user;
    const data = await service.GetProfile({ _id });
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
