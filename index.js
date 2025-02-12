const express = require("express");
const connectDB = require("./backend/config/connection");
const scheduleRoutes = require("./backend/routes/schedule.routes");
const cors = require("cors"); // Ajout de l'import manquant pour cors
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connection à la base de données
connectDB();

// Middlewares
app.use(cors()); // Import cors pour éviter les erreurs CORS
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/user", require("./backend/routes/user.routes.js"));
app.use("/schedule", require("./backend/routes/schedule.routes.js"));
app.use("/status", require("./backend/routes/status.routes.js"));
app.use("/switch", require("./backend/routes/switch.routes.js"));

// Start express server
app.listen(PORT, () => { // Correction : utiliser "PORT" au lieu de "port"
  console.log(`Serveur en ligne sur le port ${PORT}`);
});
