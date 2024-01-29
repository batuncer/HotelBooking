const ServiceDataBase = require("./servise-database");
const roomTypeDb = new ServiceDataBase("customer");
const RoomTypeService = {
  Save: async (model) => {
    let data = await roomTypeDb.Save(model);
    return data;
  },

  Get: async (id) => {
    try {
      if (id) {
        const result = await roomTypeDb.Get(id);
        return result.rows;
      } else {
        // If no "id" is provided, fetch all roomType data
        const result = await roomTypeDb.Get();
        return result.rows;
      }
    } catch (error) {
      console.error("Error retrieving customer data:", error);
      throw new Error("Internal Server Error");
    }
  },

  Pool: roomTypeDb.pool,
};

module.exports = RoomTypeService;
