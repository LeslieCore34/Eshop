// YYYYMMDDHHMMSS-customer-seeders.js

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("customers", [
      {
        name: "Customer 1",
        lastname: "Show",
        email: "customer1@localhost.localdomain",
        password: "chouchou",
        street: "LalalandOne",
        postcode: "33300",
        city: "Bordeaux",
        telephone: "0810000001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Customer 2",
        lastname: "Show",
        email: "customer2@localhost.localdomain",
        password: "chouchou",
        street: "LalalandTwo",
        postcode: "33300",
        city: "Bordeaux",
        telephone: "0810000001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Customer 3",
        lastname: "Show",
        email: "customer3@localhost.localdomain",
        password: "chouchou",
        street: "LalalandThree",
        postcode: "33300",
        city: "Bordeaux",
        telephone: "0810000001",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("customers", null, {});
  },
};
