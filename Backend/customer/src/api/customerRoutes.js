const express = require("express");
const UserService = require("../services/customer-services");

module.exports = (app) => {
  const customerRouter = express.Router();
  const service = new UserService();

  customerRouter.post("/register", async (req, res, next) => {
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
      const { data } = await service.SignUp({
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

  customerRouter.post("/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const { data } = await service.SignIn({ email, password });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  customerRouter.get("/profile", async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetProfile({ _id });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.use("/customers", customerRouter);
};
