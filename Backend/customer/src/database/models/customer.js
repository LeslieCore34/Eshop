// models/user.js

("use strict");
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      street: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      postcode: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
      },
      telephone: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "customers",
      timestamps: false,
    }
  );

  // Customer.associate = (models) => {
  //   // Définir les associations ici, si nécessaire
  // };

  return Customer;
};
