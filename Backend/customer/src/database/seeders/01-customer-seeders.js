// YYYYMMDDHHMMSS-customer-seeders.js

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("customer", [
      {
        customer_name: "Customer 1",
        customer_lastname: "show",
        customer_email: "customer1@localhost.localdomain",
        customer_street: "lalalandOne",
        customer_postcode: "33300",
        customer_city: "bordeau",
        customer_telephone: "0810000001",
      },
      {
        customer_name: "Customer 2",
        customer_lastname: "show",
        customer_email: "customer2@localhost.localdomain",
        customer_street: "lalalandTwo",
        customer_postcode: "33300",
        customer_city: "bordeau",
        customer_telephone: "0810000001",
      },
      {
        customer_name: "Customer 3",
        customer_lastname: "show",
        customer_email: "customer3@localhost.localdomain",
        customer_street: "lalalandThree",
        customer_postcode: "33300",
        customer_city: "bordeau",
        customer_telephone: "0810000001",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("customer", null, {});
  },
};
