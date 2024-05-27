const { Customer } = require("../database/models");
const { APIError } = require("../utils/app-errors");

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
      const existingCustomer = await Customer.findByPk(id);
      return existingCustomer;
    } catch (err) {
      throw new APIError(
        "API Error",
        STATUS_CODES.INTERNAL_ERROR,
        "Unable to Find Customer"
      );
    }
  }
}

module.exports = UserRepository;
