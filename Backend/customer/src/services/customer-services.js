const { UserRepository } = require("../database");
const { APIError } = require("../utils/app-errors");
const {
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} = require("../utils");

class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async SignIn(userInputs) {
    const { email, password } = userInputs;
    try {
      const existingCustomer = await this.repository.FindCustomer({ email });
      if (existingCustomer) {
        const validPassword = await ValidatePassword(
          password,
          existingCustomer.password,
          existingCustomer.salt
        );
        if (validPassword) {
          const token = await GenerateSignature({
            email: existingCustomer.email,
            _id: existingCustomer._id,
          });
          return { id: existingCustomer._id, token };
        }
      }
      return null;
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async SignUp(userInputs) {
    const {
      name,
      lastname,
      email,
      password,
      street,
      postcode,
      city,
      telephone,
    } = userInputs;
    try {
      let salt = await GenerateSalt();
      let userPassword = await GeneratePassword(password, salt);
      const existingCustomer = await this.repository.CreateCustomer({
        name,
        lastname,
        email,
        street,
        postcode,
        city,
        telephone,
        password: userPassword,
        salt,
      });
      const token = await GenerateSignature({
        email: email,
        _id: existingCustomer._id,
      });
      return { id: existingCustomer._id, token };
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }

  async GetProfile(id) {
    try {
      const existingCustomer = await this.repository.FindCustomerById({ id });
      return existingCustomer;
    } catch (err) {
      throw new APIError("Data Not found", err);
    }
  }
}

module.exports = UserService;
