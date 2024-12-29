const express = require("express");
const router = express.Router();
const pool = require("../db");
const utils = require("../utils");
const { MENU_TABLE } = require("../config");

// Add Menu Item
router.post("/add", (req, res) => {
  const { restaurant_id, name, description, price, category, availability } = req.body;
  const query = `INSERT INTO ${MENU_TABLE} (restaurant_id, name, description, price, category, availability)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  pool.execute(query, [restaurant_id, name, description, price, category, availability], (err, result) => {
    if (err) res.send(utils.createError(err.message));
    else res.send(utils.createSuccess("Menu item added successfully."));
  });
});



// All Menu Item
router.get("/all_menu", (req, res) => {
  const query = `SELECT name, description, price, category, availability, image_url FROM ${MENU_TABLE}`;
  pool.execute(query, (err, items) => {
    if (err) {
      res.send(utils.createError(err.message));
    } else {
      res.send(utils.createSuccess(items));
    }
  });
});

// Get Menu Items by Restaurant
// router.get("/:restaurant_id", (req, res) => {
//   const { restaurant_id } = req.params;
//   const query = `SELECT * FROM ${MENU_TABLE} WHERE restaurant_id = ?`;
//   pool.execute(query, [restaurant_id], (err, items) => {
//     if (err) res.send(utils.createError(err.message));
//     else res.send(utils.createSuccess(items));
//   });
// });


//get menu by resto id
router.get("/:restaurant_id", (req, res) => {
  const { restaurant_id } = req.params;
  const query = `SELECT name, description, price, category, availability, image_url FROM ${MENU_TABLE} WHERE restaurant_id = ?`;

  pool.execute(query, [restaurant_id], (err, items) => {
    if (err) {
      res.send(utils.createError(err.message));
    } else {
      res.send(utils.createSuccess(items));
    }
  });
});


module.exports = router;
