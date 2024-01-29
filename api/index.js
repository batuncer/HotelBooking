
const express = require("express");
const app = express();
const router = express.Router();

app.use("/api", router);

const customers = require("./customers");
const reservations = require("./reservations");
const roomTypes = require("./room-types");
const availableRooms = require("./available-rooms");
const loginContoller = require("./login");

router.use("/customers", customers);
router.use("/reservations", reservations);
router.use("/room-types", roomTypes);
router.use("/available-rooms", availableRooms);
router.use("/login", loginContoller);

module.exports = router;
