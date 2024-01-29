const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const ServiceDataBase = require("../services/servise-database");
const createToken = require("../utility");
const serviceDB = new ServiceDataBase("customer");
router.use(bodyParser.json());

router.post("/", async (req, res) => {
try {
  const { email, password } = req.body;
  const result = await serviceDB
    .getPool()
    .query("SELECT * FROM customer WHERE email = $1 AND password = $2", [
      email,
      password,
    ]);

    let jwtToken = "";

  if (result.rows.length > 0) {
    jwtToken = createToken(result.rows[0]["id"]);
    console.log("Login successful");
    res.status(200).json({ success: true, token:jwtToken, message: "Login successful" });

  } else {
    res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  }

  

} catch (error) {
  console.error("Login error:", error);
  res.status(500).json({ success: false, message: "Internal Server Error" });
}


});

module.exports = router;

