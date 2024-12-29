const express = require("express");
const router = express.Router();
const pool = require("../db");
const utils = require("../utils");
const { USER_TABLE } = require("../config");

// Register User
router.post("/register", (req, res) => {
  const { username, password, email, phone_number, restaurant_id, role } = req.body;
  const query = `INSERT INTO ${USER_TABLE} (username, password, email, phone_number, restaurant_id, role)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  pool.execute(query, [username, password, email, phone_number, restaurant_id, role], (err, result) => {
    if (err) res.send(utils.createError(err.message));
    else res.send(utils.createSuccess("User registered successfully."));
  });
});

// Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT user_id, username, role FROM ${USER_TABLE} WHERE email = ? AND password = ?`;
  pool.execute(query, [email, password], (err, users) => {
    if (err) res.send(utils.createError(err.message));
    else if (users.length === 0) res.send(utils.createError("Invalid credentials."));
    else res.send(utils.createSuccess(users[0]));a
  });
});


router.get("/all", (req, res) => {
  const query = `SELECT user_id, username, password, email, phone_number FROM ${USER_TABLE} WHERE role IS NULL`;
  pool.execute(query, (err, users) => {
      if (err) {
          res.send(utils.createError(err.message));
      } else {
          res.send(utils.createSuccess(users));
      }
  });
});





module.exports = router;
