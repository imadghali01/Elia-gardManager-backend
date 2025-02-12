const express = require("express");
const router = express.Router();
const {
    createSchedule, 
    getUserSchedule, 
    updateDaySchedule, 
    deleteSchedule, 
    addScheduleSlot 
} = require("../controllers/schedule.controller");

// ✅ Route pour créer un planning de 6 semaines pour un utilisateur
router.post("/", createSchedule);

// ✅ Route pour récupérer le planning d'un utilisateur
router.get("/:userId", getUserSchedule);

// ✅ Route pour modifier un jour spécifique d'une semaine
router.put("/:userId/week/:weekNumber/day/:day", updateDaySchedule);

// ✅ Route pour ajouter un créneau horaire dans un jour spécifique
router.put("/:userId/week/:weekNumber/day/:day/add-slot", addScheduleSlot);

// ✅ Route pour supprimer un planning d'un utilisateur
router.delete("/:userId", deleteSchedule);

module.exports = router;
