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
      // Création d'une nouvelle instance du modèle Schedule avec les données du body

      const { shifts, user } = req.body;
      if (!shifts || !user) {
        console.error(
          "❌ ERREUR : Les données 'shifts' et 'user' sont requises !"
        );
        return res
          .status(400)
          .json({ error: "Les données 'shifts' et 'user' sont requises." });
      }

      // Construction des données pour MongoDB
      //  Convertir `user` en ObjectId
      const schedule = new Schedule({
        shifts,
        user: new mongoose.Types.ObjectId(user),
      });

      // Sauvegarde dans la base de données
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
