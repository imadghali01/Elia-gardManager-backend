const Schedule = require("../models/schedule");

module.exports = {
  /**
   * Crée un nouvel horaire.
   * On attend dans req.body un objet au format :
   * {
   *   schedule: {
   *     <clé>: [date, userId, statusId],
   *     <clé2>: [date, userId, statusId],
   *     ...
   *   }
   * }
   */
  setSchedule: async (req, res) => {
    try {
      const { schedule } = req.body;

      // Vérification de la présence et du type du champ 'schedule'
      if (!schedule || typeof schedule !== "object") {
        return res.status(400).json({
          message: "Le champ 'schedule' est requis et doit être un objet.",
        });
      }

      // Validation de chaque entrée de la map
      for (const [key, value] of Object.entries(schedule)) {
        if (!Array.isArray(value) || value.length !== 3) {
          return res.status(400).json({
            message: `La valeur associée à '${key}' doit être un tableau de 3 éléments.`,
          });
        }
      }

      // Création du document Schedule dans la base de données
      const newSchedule = await Schedule.create({ schedule });
      return res.status(201).json(newSchedule);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  /**
   * Récupère tous les horaires.
   */
  getSchedule: async (req, res) => {
    try {
      const schedules = await Schedule.find({});
      return res.status(200).json(schedules);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  /**
   * Met à jour un horaire existant.
   * L'identifiant du document à mettre à jour est passé en paramètre (req.params.id).
   * On attend dans req.body un objet contenant le champ 'schedule' au même format que pour la création.
   */
  putSchedule: async (req, res) => {
    try {
      const { id } = req.params;
      const { schedule } = req.body;

      if (!schedule || typeof schedule !== "object") {
        return res.status(400).json({
          message: "Le champ 'schedule' est requis et doit être un objet.",
        });
      }

      // Validation de chaque entrée de la map
      for (const [key, value] of Object.entries(schedule)) {
        if (!Array.isArray(value) || value.length !== 3) {
          return res.status(400).json({
            message: `La valeur associée à '${key}' doit être un tableau de 3 éléments(date,userid,status).`,
          });
        }
      }

      // Mise à jour du document et récupération de la version modifiée
      const updatedSchedule = await Schedule.findByIdAndUpdate(
        id,
        { schedule },
        { new: true }
      );

      if (!updatedSchedule) {
        return res.status(404).json({ message: "Horaire non trouvé" });
      }

      return res.status(200).json(updatedSchedule);
    } catch (error) {
      return res.status(500).json({ error: error.message });
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
        return res.status(404).json({ message: "Horaire non trouvé" });
      }

      return res.status(200).json({ message: "Horaire supprimé avec succès" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
