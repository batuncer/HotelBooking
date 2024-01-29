const express = require("express");
const router = express.Router();
const { pool } = require("../services/servise-database");
const dotenv = require("dotenv");
const Customer = require("../services/customer-services");
const createToken = require("../utility");
const verifyToken = require("./verifyToken");
dotenv.config();

router.get("/get-profile", verifyToken, async (req, res) => {
  try {
    console.log(req.userId);
    const id = req.userId;

    if (id) {
      const customer = await Customer.GetById(id);
      console.log(customer);
      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/:id?", async (req, res) => {
  try {
    const { id } = req.params;

    if (id) {
      const customer = await Customer.GetById(id);

      if (customer) {
        res.status(200).json(customer);
      } else {
        res.status(404).json({ error: "Customer not found" });
      }
    } else {
      const customers = await Customer.GetAll();
      res.status(200).json(customers);
    }
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Save customer data
    const result = await Customer.Save([firstName, lastName, email, password]);

    let jwtToken = "";
    jwtToken = createToken(result);

    console.log("Sing UP successful");
    res.status(200).json({
      success: true,
      token: jwtToken,
      message: "sING UP successful",
    });

     } catch (error) {
    console.error("Error processing customer data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT endpoint
router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const result = await Customer.Pool.query(
      "INSERT INTO customer (firstname, surname, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
      [firstName, lastName, email, password]
    );

    const insertedId = result.rows[0].id;

    let jwtToken = createToken(insertedId);

    res
      .status(200)
      .json({ success: true, token: jwtToken, message: "Sing up successful" });
  } catch (error) {
    console.error("Error processing customer data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/", async (req, res) => {
  try {
    // Get the data from the request
    const { id } = req.body;

    // If required data is missing, send an error
    if (!id) {
      return res.status(400).json({ error: "Incomplete data provided" });
    }

    // Delete the customer
    const result = await pool.query("DELETE FROM customer WHERE id = $1", [id]);

    // Send a success response to the client
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
