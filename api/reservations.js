const express = require("express");
const router = express.Router();
const { pool } = require("../services/servise-database");

const verifyToken = require("./verifyToken");
const reservationService = require("../services/reservation-service");
// POST endpoint for creating a reservation
router.post("/", verifyToken, async (req, res) => {
  try {
    const reservationData = req.body.reservation;

    const customerId = req.userId;

    const { room_id, checkin, checkout, room_price } = reservationData;
    const reservationResult = await reservationService.Save([
      customerId,
      room_id,
      checkin,
      checkout,
      room_price,
    ]);
    const reservationId = reservationResult.rows[0].id;

    res.status(200).json({ IsSuscces: true });
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/all-details", async (req, res) => {
  try {
    const result = await reservationService.GetAll();

    res.status(200).json(result);
  } catch (error) {
    console.error("Error retrieving all reservation details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// GET endpoint for retrieving reservations by customer name or ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.query;

    const reservationDetailsResult = reservationService.Get(id);
    const reservationDetails = reservationDetailsResult.rows[0];
    res.status(200).json(reservationDetails);
  } catch (error) {
    console.error("Error retrieving reservations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
