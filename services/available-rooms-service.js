const ServiceDataBase = require("./servise-database");
const roomDb = new ServiceDataBase("rooms");

const AvailableRoom = {
  GetByDate: async (startDate, endDate, roomType) => {
    const query = `SELECT * FROM public.rooms r
JOIN public.room_types rt ON r.room_type_id = rt.id
FULL OUTER JOIN public.reservations rvz ON r.id = rvz.room_id
WHERE (
  rvz.checkout IS NULL OR
  (
    (rvz.checkin NOT BETWEEN $1 AND $2) 
    AND (rvz.checkout NOT BETWEEN $1 AND $2)
    AND (rvz.checkin < $1 OR rvz.checkout > $2)
  )
) AND r.room_type_id = $3`;

    const result = await roomDb.ExecuteSql(query, [
      startDate,
      endDate,
      roomType,
    ]);
    console.log(result.rows);
    const availableRooms = result.rows;

    return availableRooms;
  },
};

module.exports = AvailableRoom;
