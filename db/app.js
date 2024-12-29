const express = require("express");
const cors = require("cors");
const app = express();
const { PORT } = require("./config");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/user", require("./routes/user"));
app.use("/restaurant", require("./routes/restaurant"));
app.use("/menu", require("./routes/menu"));
app.use("/cart", require("./routes/cart"));

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
