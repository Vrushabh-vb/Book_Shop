// Place Order
router.post("/place_order", (req, res) => {
    const { user_id, restaurant_id, address} = req.body;
    const query = `INSERT INTO ${RESTAURANT_TABLE} (name, description, address)
                   VALUES (?, ?, ?, ?, ?, ?)`;
    pool.execute(query, [user_id, restaurant_id, address], (err, result) => {
      if (err) res.send(utils.createError(err.message));
      else res.send(utils.createSuccess("Restaurant added successfully."));
    });
  });