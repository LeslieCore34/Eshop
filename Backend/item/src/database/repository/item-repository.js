const { ItemModel } = require("../models");
const { APIError } = require("../../utils/app-errors");

class ProductRepository {
  async CreateProduct({ category_id, title, unit_price, description, image }) {
    try {
      const product = new ProductModel({
        category_id,
        title,
        unit_price,
        description,
        image,
      });

      const productResult = await product.save();
      return productResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Product"
      );
    }
  }

  async Products() {
    try {
      return await ItemModel.findAll();
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Get Products"
      );
    }
  }

  async FindByCategory(category) {
    try {
      const products = await ItemModel.findAll({
        where: { category_id: category },
      });
      return products;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find category"
      );
    }
  }

  async FindById(id) {
    try {
      return await ItemModel.findByPk(id);
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Product"
      );
    }
  }

  //   async FindSelectedProducts(selectedIds) {
  //     try {
  //       const products = await ProductModel.find()
  //         .where("_id")
  //         .in(selectedIds.map((_id) => _id))
  //         .exec();
  //       return products;
  //     } catch (err) {
  //       throw new APIError(
  //         "API Error",
  //         STATUS_CODES.INTERNAL_ERROR,
  //         "Unable to Find Product"
  //       );
  //     }
  //   }
}

module.exports = ProductRepository;
