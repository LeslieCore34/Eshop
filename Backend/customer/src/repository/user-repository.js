const { Customer } = require("../database/models");
const { APIError } = require("../utils/app-errors");

console.log("trying to print Customer import", Customer);

class UserRepository {
  async CreateCustomer({
    name,
    lastname,
    email,
    street,
    postcode,
    city,
    telephone,
    password,
    salt,
  }) {
    try {
      const customer = new CustomerModel({
        name,
        lastname,
        email,
        street,
        postcode,
        city,
        telephone,
        password,
        salt,
      });
      const customerResult = await customer.save();
      return customerResult;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Create Customer"
      );
    }
  }

  async FindCustomer({ email }) {
    try {
      const existingCustomer = await Customer.findOne({
        where: { email: email },
      });
      return existingCustomer;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Customer"
      );
    }
  }

  async FindCustomerById({ id }) {
    try {
      console.log(`Repository: Finding customer with ID: ${id}`); // Log pour débogage
      const existingCustomer = await Customer.findByPk(id);
      if (!existingCustomer) {
        console.log(`Repository: Customer with ID: ${id} not found`); // Log pour débogage
      }
      return existingCustomer;
    } catch (err) {
      console.error(`Repository Error: ${err.message}`); // Log pour débogage
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Customer"
      );
    }
  }
}

module.exports = UserRepository;
