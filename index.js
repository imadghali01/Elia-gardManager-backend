const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDB = require("./backend/config.js/connection.js");
const port = 8000;

//connection to db
connectDB();

const app = express();

//app mandatory imports
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", require("./backend/routes/user.routes.js"));
app.use("/schedule", require("./backend/routes/schedule.routes.js"));
app.use("/status", require("./backend/routes/status.routes.js"));
app.use("/switch", require("./backend/routes/switch.routes.js"));

// Start express server
app.listen(port, () => {
  console.log(`Serveur en ligne sur le port ${port}`);
});
