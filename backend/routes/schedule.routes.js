const express = require("express");
const router = express.Router();
const {
  //import des controllers
  setSchedule,
  getSchedule,
  delSchedule,
  validateSwitch,
  putSchedule,
} = require("../controllers/schedule.controller");

// ✅ Route pour créer un planning de 6 semaines pour un utilisateur
router.post("/", setSchedule);

// ✅ Route pour récupérer le planning d'un utilisateur
router.get("/", getSchedule);

// ✅ Route pour ajouter un créneau horaire dans un jour spécifique
router.put("/:id", putSchedule);

// route pour valider les switch

router.put("/", validateSwitch);

// ✅ Route pour supprimer un planning d'un utilisateur
router.delete("/:id", delSchedule);

module.exports = router;
