const express = require("express");
const router = express.Router();
const {
  setSchedule,
  getSchedule,
  delSchedule,
  putSchedule,
} = require("../controllers/schedule.controller");

// ✅ Route pour créer un planning de 6 semaines pour un utilisateur
router.post("/", setSchedule);

// ✅ Route pour récupérer le planning d'un utilisateur
router.get("/", getSchedule);

// ✅ Route pour ajouter un créneau horaire dans un jour spécifique
router.put("/:id", putSchedule);

// ✅ Route pour supprimer un planning d'un utilisateur
router.delete("/:id", delSchedule);

module.exports = router;
