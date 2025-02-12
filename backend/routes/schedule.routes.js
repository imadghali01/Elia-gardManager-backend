const express = require("express");
const router = express.Router();
const { setSchedule, getSchedule, putSchedule, delSchedule } = require("../controllers/schedule.controller");

// ✅ Route pour créer un horaire
router.post("/", setSchedule);

// ✅ Route pour récupérer tous les horaires
router.get("/", getSchedule);

// ✅ Route pour modifier un horaire (avec un ID dans l'URL)
router.put("/:id", putSchedule);

// ✅ Route pour supprimer un horaire (avec un ID)
router.delete("/:id", delSchedule);

module.exports = router;
