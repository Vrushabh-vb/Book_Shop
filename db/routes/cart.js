const express = require("express");
const router = express.Router();
const pool = require("../db");
const utils = require("../utils");
const { CART_TABLE } = require("../config");

// Add to Cart
router.post("/add", (req, res) => {
  const { user_id, restaurant_id, item_id, quantity, total_price } = req.body;
  const query = `INSERT INTO ${CART_TABLE} (user_id, restaurant_id, item_id, quantity, total_price)
                 VALUES (?, ?, ?, ?, ?)`;
  pool.execute(query, [user_id, restaurant_id, item_id, quantity, total_price], (err, result) => {
    if (err) res.send(utils.createError(err.message));
    else res.send(utils.createSuccess("Item added to cart."));
  });
});

module.exports = router;
