const AbstractManager = require("./AbstractManager");

class ItemManager extends AbstractManager {
  constructor() {
    super({ table: "product" });
  }

  async readAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
    return result;
  }

  async readMen() {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE category_id = 1`
    );
    return result;
  }

  async readWomen() {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE category_id = 2`
    );
    return result;
  }

  async create(item) {
    const [result] = await this.database.query(
      `insert into ${this.table} (category_id, title, unit_price, description, image) values (?, ?, ?, ?, ?)`,
      [
        item.category_id,
        item.title,
        item.unit_price,
        item.description,
        item.image,
      ]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async update(id, item) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET category_id = ?, title = ?, unit_price = ?, description = ?, image = ? WHERE id = ?`,
      [
        item.category_id,
        item.title,
        item.unit_price,
        item.description,
        item.image,
        id,
      ]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table}  WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = ItemManager;
