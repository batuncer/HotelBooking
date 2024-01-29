const express = require("express");
const dotenv = require("dotenv");
const AvailableRoom = require("../services/available-rooms-service");

dotenv.config();
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    console.log(req.query);
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const roomType = req.query['roomType'];
    console.log(roomType)

    const availableRooms = await AvailableRoom.GetByDate(
      startDate,
      endDate,
      roomType
    );

    res.status(200).json(availableRooms);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
