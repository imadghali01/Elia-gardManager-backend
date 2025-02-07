const express = require("express");
const router = express.Router();
const mongoose = require("../connection.js");

router.post("/add_schedule", async (req, res) => {
  try {
    // Récupère la collection 'users' depuis la connexion établie
    const usersCollection = mongoose.connection.db.collection("users");
    const users = await usersCollection.find({}).toArray();

    // Récupère le premier couple clé/valeur du premier utilisateur
    const firstUser = users;

    res.json(firstUser);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
