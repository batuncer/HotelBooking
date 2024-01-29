const { Pool } = require("pg");
const dotenv = require("dotenv");

class ServiceDataBase {
  constructor(dataBaseName) {
    this.dbName = dataBaseName;

    dotenv.config();

    this.pool = new Pool({
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      ssl: {
        rejectUnauthorized: false,
      },
    });
  }

  async Save(model) {
    debugger;
    const fields = "(" + Object.entries(model).keys().join() + ")";
    const values =
      "VALUES (" +
      Object.values(model)
        .values()
        .map((e, i) => `$${i + 1}`)
        .join() +
      ")";
    let sqlString = `INSERT INTO ${this.dbName} ${fields} ${values}`;
    const result = await this.pool.query(sqlString, Object.values(model));
    const insertedId = result.rows[0].id;
    return insertedId;
  }

  async GetAll() {
    try {
      const result = await this.pool.query(`SELECT * FROM ${this.dbName}`);
      return result.rows;
    } catch (error) {
      console.error("Error retrieving data:", error);
      throw new Error("Internal Server Error");
    }
  }

  async GetById(id) {
    try {
      if (id) {
        const result = await this.pool.query(
          `SELECT * FROM ${this.dbName} WHERE id = $1`,
          [id]
        );
        return result.rows;
      } else {
        console.error("ID is required to retrieve a specific item");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
      throw new Error("Internal Server Error");
    }
  }

  async ExecuteSql(sqlString, parameter = null) {
    if (parameter) {
      const result = await this.pool.query(sqlString, parameter);
      return result;
    } else {
      const result = await this.pool.query(sqlString);
      return result;
    }
  }

  async AvailableRooms() {}

  getPool() {
    return this.pool;
  }
}

module.exports = ServiceDataBase;
