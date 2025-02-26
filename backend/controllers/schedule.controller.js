const Schedule = require("../models/schedule");
const mongoose = require("mongoose");

module.exports = {
  /**
   * Crée un nouvel horaire.
   * On attend dans req.body un objet JSON qui sera directement enregistré.
   */
  setSchedule: async (req, res) => {
    try {
      console.log(
        "📥 Requête reçue pour créer un planning :",
        JSON.stringify(req.body, null, 2)
      );
      const { shifts, user } = req.body;
      if (!shifts || !user) {
        console.error(
          "❌ ERREUR : Les données 'shifts' et 'user' sont requises !"
        );
        return res
          .status(400)
          .json({ error: "Les données 'shifts' et 'user' sont requises." });
      }
      const schedule = new Schedule({ shifts });
      const savedSchedule = await schedule.save();
      console.log("✅ Planning enregistré :", savedSchedule);
      res.status(201).json(savedSchedule);
    } catch (err) {
      console.error("❌ Erreur serveur :", err);
      res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  /**
   * Récupère tous les horaires.
   */
  getSchedule: async (req, res) => {
    try {
      const schedules = await Schedule.find();
      res.status(200).json(schedules);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Met à jour un horaire existant.
   * L'identifiant du document à mettre à jour est passé en paramètre (req.params.id)
   * et on attend dans req.body la ou les clés à mettre à jour.
   */
  putSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!updatedSchedule) {
        return res.status(404).json({ error: "Schedule not found" });
      }
      res.status(200).json(updatedSchedule);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  /**
   * Valide le switch et met à jour les schedules.
   * Pour chaque shift et pour chaque jour dont la date (dayData[0])
   * est comprise entre dateIn et dateOut, si dayData[1] correspond à userOne,
   * on le remplace par userTwo.
   * On attend dans req.body un objet contenant : dateIn, dateOut, userOne, userTwo.
   */
  validateSwitch: async (req, res) => {
    try {
      const { dateIn, dateOut, userOne, userTwo } = req.body;
      const dIn = new Date(dateIn);
      const dOut = new Date(dateOut);

      // Récupération de tous les schedules
      const allSchedules = await Schedule.find({});
      const updatedSchedules = [];

      // Parcours de chaque schedule
      for (const schedule of allSchedules) {
        let hasDateInRange = false; // Au moins une date dans l'intervalle
        let scheduleNeedsSave = false; // Indique si le schedule a été modifié

        // Parcours de chaque shift dans le schedule
        for (const shiftKey in schedule.shifts) {
          const shift = schedule.shifts[shiftKey];

          // Parcours de chaque jour dans le shift (ex : lundi, mardi, etc.)
          for (const dayKey in shift) {
            const dayData = shift[dayKey];
            // Format attendu : [ dateJour, userId, statusId ]
            if (!Array.isArray(dayData) || dayData.length < 2) continue;

            const [currentDate, assignedUser] = dayData;
            const currentDateObj = new Date(currentDate);

            // Vérifie si la date se trouve dans l'intervalle [dIn, dOut]
            if (currentDateObj >= dIn && currentDateObj <= dOut) {
              hasDateInRange = true;
              // Si l'utilisateur assigné correspond à userOne, on le remplace par userTwo
              if (String(assignedUser) === String(userOne)) {
                dayData[1] = userTwo;
                scheduleNeedsSave = true;
              }
            }
          }
        }

        // Si le schedule a été modifié, on le sauvegarde
        if (hasDateInRange && scheduleNeedsSave) {
          await schedule.save();
          updatedSchedules.push(schedule);
        }
      }

      const message =
        updatedSchedules.length === 0
          ? "Switch créé, mais aucun schedule n'a été mis à jour (aucune date concernée ou aucun userOne à remplacer)."
          : "Switch créé et schedules mis à jour avec succès.";

      return res.status(200).json({
        message,
        switch: req.body,
        updatedSchedules,
      });
    } catch (err) {
      console.error("❌ Erreur lors de la validation du switch :", err);
      return res.status(500).json({ error: "Erreur interne du serveur" });
    }
  },

  /**
   * Supprime un horaire existant.
   * L'identifiant du document à supprimer est passé en paramètre (req.params.id).
   */
  delSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedSchedule = await Schedule.findByIdAndDelete(id);
      if (!deletedSchedule) {
        return res.status(404).json({ error: "Schedule not found" });
      }
      res.status(200).json({ message: "Schedule deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};
