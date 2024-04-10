const bcrypt = require("bcrypt");

const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  static hashPassword(password, workFactor = 5) {
    return bcrypt.hash(password, workFactor);
  }

  async create(user) {
    const hash = await UserManager.hashPassword(user.password);

    const [result] = await this.database.query(
      `insert into ${this.table} (name, lastname, email, password, street, postcode, city, telephone) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user.name,
        user.lastname,
        user.email,
        hash,
        user.street,
        user.postcode,
        user.city,
        user.telephonne,
      ]
    );

    return result.insertId;
  }

  // async readProfile(id) {
  //   return this.database.query(
  //     `SELECT id, name, lastname, email, street, postcode, city, telephone FROM ${this.table} WHERE id = ?`,
  //     [id]
  //   );
  // }

  getProfile(id) {
    return this.database.query(
      `SELECT name, lastname, email, street, postcode, city, telephone FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  async login({ name, password }) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where  name = ? or email = ?`,
      [name, name]
    );

    if (!rows.length) {
      return undefined;
    }

    const user = rows[0];
    const result = await bcrypt.compare(password, user.password);
    return result ? user : undefined;
  }
}

module.exports = UserManager;
