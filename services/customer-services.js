const ServiceDataBase = require("./servise-database");
const customerDb = new ServiceDataBase("customer");
const Customer = {
  Save: async (model) => {
    const data = await customerDb.pool.query(
      "INSERT INTO customer (firstname, surname, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
      model
    );

    return data.rows[0].id;
  },

  GetAll: async () => {
    try {
      const result = await customerDb.GetAll();
      return result;
    } catch (error) {
      console.error("Error retrieving customer data:", error);
      throw new Error("Internal Server Error");
    }
  },

  GetById: async (id) => {
    try {
      if (id) {
        const result = await customerDb.GetById(id);
        return result[0];
      } else {
        console.error("ID is required to retrieve a specific customer");
        return null;
      }
    } catch (error) {
      console.error("Error retrieving customer data:", error);
      throw new Error("Internal Server Error");
    }
  },

  Put: async (id, model) => {
    try {
      const { firstname, surname, email, password } = model;

      const updateResult = await customerDb.Update(id, {
        firstname,
        surname,
        email,
        password,
      });

      if (updateResult.rows.length === 0) {
        return { error: "Customer not found" };
      }

      const updatedCustomer = updateResult.rows[0];
      return updatedCustomer;
    } catch (error) {
      console.error("Error updating customer data:", error);
      throw new Error("Internal Server Error");
    }
  },

  Delete: async (id) => {
    try {
      const deleteResult = await customerDb.Delete(id);

      if (deleteResult.rows.length === 0) {
        return { error: "Customer not found" };
      }

      return { message: "Customer deleted successfully" };
    } catch (error) {
      console.error("Error deleting customer:", error);
      throw new Error("Internal Server Error");
    }
  },
  Pool: customerDb.pool,
};
module.exports = Customer;
