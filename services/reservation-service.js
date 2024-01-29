const ServiceDataBase = require("./servise-database");
const reservationDb = new ServiceDataBase("reservation");
const Reservation = {
  Save: async (model) => {
    const data = reservationDb.pool.query(
      `
      INSERT INTO reservations (customer_id, room_id, checkin, checkout, room_price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `,
      model
    );
    return data;
  },

  Get: async (id) => {
    try {
      //  no "id" is provided, fetch all customer data
      const result = await reservationDb.ExecuteSql(
        `
      SELECT
        r.id AS reservation_id,
        r.customer_id,
        r.room_id,
        rt.type_name AS room_type_name,
        r.checkin,
        r.checkout,
        r.room_price,
        c.firstname,
        c.surname
      FROM
        reservations r
        INNER JOIN rooms rm ON r.room_id = rm.id
        INNER JOIN room_types rt ON rm.room_type_id = rt.id
        INNER JOIN customer c On c.id = r.customer_id
      
      WHERE r.id = $1
    `,
        [id]
      );
      return result.rows;
    } catch (error) {
      console.error("Error retrieving customer data:", error);
      throw new Error("Internal Server Error");
    }
  },
  GetAll: async () => {
    try {
      //  no "id" is provided, fetch all customer data
      const result = await reservationDb.ExecuteSql(
        `
      SELECT
        r.id AS reservation_id,
        r.customer_id,
        r.room_id,
        rt.type_name AS room_type_name,
        r.checkin,
        r.checkout,
        r.room_price,
        c.firstname,
        c.surname
      FROM
        reservations r
        INNER JOIN rooms rm ON r.room_id = rm.id
        INNER JOIN room_types rt ON rm.room_type_id = rt.id
        INNER JOIN customer c On c.id = r.customer_id

    `
      );
      return result.rows;
    } catch (error) {
      console.error("Error retrieving customer data:", error);
      throw new Error("Internal Server Error");
    }
  },
  GetEmptyRoom: async (startDate, endDate, roomTye) => {
    var result = await reservationDb.ExecuteSql(
      "select * from public.rooms where id = $1",
      [11]
    );
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
};

module.exports = Reservation;
