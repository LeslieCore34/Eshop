const { ItemRepository } = require("../database");
const { APIError } = require("../utils/app-errors");

// // All Business logic will be here
class ItemService {
  constructor() {
    this.repository = new ItemRepository();
  }

  async CreateProduct(productInputs) {
    try {
      const productResult = await this.repository.CreateProduct(productInputs);
      return productResult;
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetProducts() {
    try {
      const products = await this.repository.Products();
      return products;
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetProductsByCategory(category) {
    try {
      const products = await this.repository.FindByCategory(category);
      return products;
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  async GetProductId(productId) {
    try {
      const product = await this.repository.FindById(productId);
      return product;
    } catch (err) {
      throw new APIError("Data Not found");
    }
  }

  //   async GetSelectedProducts(selectedIds) {
  //     try {
  //       const products = await this.repository.FindSelectedProducts(selectedIds);
  //       return FormateData(products);
  //     } catch (err) {
  //       throw new APIError("Data Not found");
  //     }
  //   }

  //   async GetProductById(productId) {
  //     try {
  //       return await this.repository.FindById(productId);
  //     } catch (err) {
  //       throw new APIError("Data Not found");
  //     }
  //   }
}

module.exports = ItemService;
