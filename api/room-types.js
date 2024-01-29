const express = require("express");
const router = express.Router();
const RoomTypeService = require("../services/room-type-service");

// GET endpoint for retrieving room types
router.get("/", async (req, res) => {
  try {
    const query =
      "SELECT id, type_name,title, original_price,current_price, img FROM room_types";
    const result = await RoomTypeService.Pool.query(query);

    // Extract relevant data from the database result
    const roomTypes = result.rows.map((row) => ({
      id: row.id,
      type_name: row.type_name,
      title:row.title,
      original_price: row.original_price,
      current_price: row.current_price,
      img: row.img,

      
    }));

    res.status(200).json({
      roomtypes: roomTypes,
    });
  } catch (error) {
    console.error("Error retrieving room types:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET endpoint for retrieving a specific room type by ID
router.get("/:id", async (req, res) => {
  try {
    const roomId = req.params.id;
    const query =
      "SELECT id, type_name, title, original_price, current_price, img FROM room_types WHERE id = $1";
    const result = await RoomTypeService.Pool.query(query, [roomId]);

    if (result.rows.length === 0) {
      res.status(404).json({ error: "Room type not found" });
    } else {
      const roomType = {
        id: result.rows[0].id,
        type_name: result.rows[0].type_name,
        title: result.rows[0].title,
        original_price: result.rows[0].original_price,
        current_price: result.rows[0].current_price,
        img: result.rows[0].img,
      };

      res.status(200).json({ roomtype: roomType });
    }
  } catch (error) {
    console.error("Error retrieving room type by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
