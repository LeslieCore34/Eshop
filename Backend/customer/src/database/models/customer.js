module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer_lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      customer_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      customer_street: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      customer_postcode: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      customer_city: {
        type: DataTypes.STRING,
      },
      customer_telephone: {
        type: DataTypes.STRING,
      },
    },
    {
      // Options du modèle
      tableName: "customer",
      timestamps: false,
    }
  );

  // Customer.associate = (models) => {
  //   // Définir les associations ici, si nécessaire
  // };

  return Customer;
};
