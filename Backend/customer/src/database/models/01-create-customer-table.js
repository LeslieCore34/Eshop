// XXXXXXXXXXXXXX-create-customer-table.js

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("customer", {
      customer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customer_lastname: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customer_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      customer_street: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      customer_postcode: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      customer_city: {
        type: Sequelize.STRING,
      },
      customer_telephone: {
        type: Sequelize.STRING,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("customer");
  },
};
