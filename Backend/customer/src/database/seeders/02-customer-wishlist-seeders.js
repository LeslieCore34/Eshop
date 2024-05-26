// YYYYMMDDHHMMSS-customer-wishlist-seeders.js

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("customer_wishlist", [
      {
        customer_id: 1,
        product_id: 1,
        wishlist_created_at: new Date(),
      },
      {
        customer_id: 1,
        product_id: 2,
        wishlist_created_at: new Date(),
      },
      {
        customer_id: 1,
        product_id: 3,
        wishlist_created_at: new Date(),
      },
      {
        customer_id: 2,
        product_id: 1,
        wishlist_created_at: new Date(),
      },
      {
        customer_id: 2,
        product_id: 2,
        wishlist_created_at: new Date(),
      },
      {
        customer_id: 3,
        product_id: 3,
        wishlist_created_at: new Date(),
      },
      // Add more data here if needed
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("customer_wishlist", null, {});
  },
};
