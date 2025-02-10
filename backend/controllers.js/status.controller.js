const Status = require("../models/status");

module.exports = {
  /**
   * Crée un nouveau status.
   * On attend dans le corps de la requête (req.body) les informations suivantes :
   * - user (Number, unique)
   * - State (String, parmi "Up", "Ongard", "Sickness", "Holidays")
   * - statusIn (Date, optionnel)
   * - statusOut (Date, optionnel)
   */
  setStatus: async (req, res) => {
    try {
      const newStatus = new Status(req.body);
      const savedStatus = await newStatus.save();
      res.status(201).json(savedStatus);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Récupère la liste de tous les status.
   */
  getStatus: async (req, res) => {
    try {
      const statuses = await Status.find();
      res.status(200).json(statuses);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Met à jour un status existant.
   * On attend dans l'URL un paramètre "id" (req.params.id) et dans le corps de la requête
   * les champs à mettre à jour (par exemple, State, statusIn, statusOut).
   */
  putStatus: async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res
          .status(400)
          .json({ error: "ID du status manquant dans l'URL." });
      }

      // Met à jour le document en appliquant les validations et retourne le document mis à jour.
      const updatedStatus = await Status.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!updatedStatus) {
        return res.status(404).json({ error: "Status non trouvé." });
      }

      res.status(200).json(updatedStatus);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
