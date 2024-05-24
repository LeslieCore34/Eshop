// router.get("/users/me", authMiddleware, userControllers.getProfile);
// router.post("/users", userControllers.add); // créer son compte DONE

const UserService = require("../services/user-services");

module.exports = (app) => {
  const service = new UserService();

  app.post("/customer/register", async (req, res, next) => {
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

  app.post("/customer/login", async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const { data } = await service.SignIn({ email, password });

      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // app.post("/customer/address", UserAuth, async (req, res, next) => {
  //   try {
  //     const { _id } = req.user;

  //     const { street, postalCode, city, country } = req.body;

  //     const { data } = await service.AddNewAddress(_id, {
  //       street,
  //       postalCode,
  //       city,
  //       country,
  //     });

  //     return res.json(data);
  //   } catch (err) {
  //     next(err);
  //   }
  // });

  app.get("/customer/profile", async (req, res, next) => {
    try {
      const { _id } = req.user;
      const { data } = await service.GetProfile({ _id });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  // app.get("/customer/shoping-details", UserAuth, async (req, res, next) => {
  //   try {
  //     const { _id } = req.user;
  //     const { data } = await service.GetShopingDetails(_id);

  //     return res.json(data);
  //   } catch (err) {
  //     next(err);
  //   }
  // });

  // app.get("/customer/wishlist", UserAuth, async (req, res, next) => {
  //   try {
  //     const { _id } = req.user;
  //     const { data } = await service.GetWishList(_id);
  //     return res.status(200).json(data);
  //   } catch (err) {
  //     next(err);
  //   }
  // });
};
