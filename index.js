const express = require("express");
const cors = require("cors");
const session = require("express-session");
const dotenv = require("dotenv").config();
const connectDB = require("./backend/config.js/connection.js");
const port = 8000;

//connection to db
connectDB();

const app = express();

// 🔹 CORS doit être AVANT express-session
app.use(cors({
    origin: "http://localhost:5173", // ⭐ Autorise le front
    credentials: true, // ❗ Obligatoire pour envoyer les cookies de session
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Configuration des sessions
app.use(session({
    secret: process.env.SESSION_SECRET || 'supersecretkey',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, // false en développement, true en production (avec HTTPS)
              httpOnly: true, //  Protège contre le vol de cookies via JS
              sameSite: "lax" //  Permet d'éviter certains problèmes CORS
    }
}));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app mandatory imports
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/user", require("./backend/routes/user.routes.js"));
app.use("/schedule", require("./backend/routes/schedule.routes.js"));
app.use("/status", require("./backend/routes/status.routes.js"));
app.use("/switch", require("./backend/routes/switch.routes.js"));

// Route temporaire pour affihcé le contenu de la session
app.get("/session", (req, res) => {
    res.json({ session: req.session });
});

// Start express server
app.listen(port, () => {
  console.log(`🐍 Serveur en ligne sur le port ${port}`);
});