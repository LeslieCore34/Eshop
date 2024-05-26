// XXXXXXXXXXXXXX-create-customer-wishlist-table.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("customer_wishlist", {
      wishlist_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      wishlist_created_at: {
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("customer_wishlist");
  },
};
