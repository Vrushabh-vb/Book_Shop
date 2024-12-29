const express = require("express");
const router = express.Router();
const pool = require("../db");
const utils = require("../utils");
const { RESTAURANT_TABLE } = require("../config");

// Add Restaurant
router.post("/add", (req, res) => {
  const { name, description, address, contact_number, rating, status } = req.body;
  const query = `INSERT INTO ${RESTAURANT_TABLE} (name, description, address, contact_number, rating, status)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  pool.execute(query, [name, description, address, contact_number, rating, status], (err, result) => {
    if (err) res.send(utils.createError(err.message));
    else res.send(utils.createSuccess("Restaurant added successfully."));
  });
});

// Fetch All Restaurants
router.get("/all", (req, res) => {
  const query = `SELECT * FROM ${RESTAURANT_TABLE}`;
  pool.execute(query, (err, restaurants) => {
    if (err) res.send(utils.createError(err.message));
    else res.send(utils.createSuccess(restaurants));
  });
});

module.exports = router;
