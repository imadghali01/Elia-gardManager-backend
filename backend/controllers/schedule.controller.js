const Schedule = require("../models/schedule");

module.exports = {
  /**
   * Crée un nouvel horaire.
   * On attend dans req.body un objet JSON qui sera directement enregistré.
   */
  setSchedule: async (req, res) => {
    try {
      // Création d'une nouvelle instance du modèle Schedule avec les données du body
      const schedule = new Schedule(req.body);
      // Sauvegarde dans la base de données
      const savedSchedule = await schedule.save();
      res.status(201).json(savedSchedule);
    } catch (err) {
      res.status(500).json({ error: err.message });
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
      // Mise à jour du document avec les données du body
      const updatedSchedule = await Schedule.findByIdAndUpdate(id, req.body, {
        new: true,
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
