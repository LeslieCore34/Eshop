const ItemService = require("../services/item-services");

module.exports = (app) => {
  const service = new ItemService();

  app.post("/product/create", async (req, res, next) => {
    try {
      const { category_id, title, unit_price, description, image } = req.body;
      // validation
      const { data } = await service.CreateProduct({
        category_id,
        title,
        unit_price,
        description,
        image,
      });
      return res.json(data);
    } catch (err) {
      next(err);
    }
  });

  app.get("/category/:type", async (req, res, next) => {
    const category = req.params.type; //VERIFIER FRONT CAR PAS SUR

    try {
      const products = await service.getProductsByCategory(category);
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  });

  app.get("/", async (req, res, next) => {
    try {
      const { data } = await service.GetProducts();
      return res.status(200).json(data);
    } catch (error) {
      next(err);
    }
  });

  app.get("/:id", async (req, res, next) => {
    const productId = req.params.id;

    try {
      const { data } = await service.GetProductId(productId);
      return res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  });

  //   app.post("/ids", async (req, res, next) => {
  //     try {
  //       const { ids } = req.body;
  //       const products = await service.GetSelectedProducts(ids);
  //       return res.status(200).json(products);
  //     } catch (err) {
  //       next(err);
  //     }
  //   });

  //   app.delete("/cart/:id", UserAuth, async (req, res, next) => {
  //     const { _id } = req.user;

  //     try {
  //       const product = await service.GetProductById(req.params.id);
  //       const result = await customerService.ManageCart(_id, product, 0, true);
  //       return res.status(200).json(result);
  //     } catch (err) {
  //       next(err);
  //     }
  //   });
};
