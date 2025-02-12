const Switch = require("../models/switch");

module.exports = {
  /**
   * Crée un nouveau switch.
   * Expects dans le body une structure (par exemple) { name: "Nom du switch", state: true/false }
   */
  setSwitch: async (req, res) => {
    try {
      // Création d'une nouvelle instance du modèle à partir des données reçues dans req.body
      const newSwitch = new Switch(req.body);
      await newSwitch.save();
      res.status(201).json(newSwitch);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Récupère tous les switches.
   */
  getSwitchs: async (req, res) => {
    try {
      // Recherche de tous les documents de la collection
      const switches = await Switch.find();
      res.status(200).json(switches);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Met à jour l'état (state) d'un switch identifié par son id.
   * Expects : dans req.params l'id et dans req.body la nouvelle valeur { state: true/false }
   */
  putSwitchState: async (req, res) => {
    try {
      const { id } = req.params;
      const { state } = req.body;

      // Mise à jour du document et retour du nouveau document modifié
      const updatedSwitch = await Switch.findByIdAndUpdate(
        id,
        { state },
        { new: true, runValidators: true }
      );

      if (!updatedSwitch) {
        return res.status(404).json({ error: "Switch non trouvé" });
      }

      res.status(200).json(updatedSwitch);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Supprime un switch identifié par son id.
   * Expects : dans req.params l'id
   */
  delSwitch: async (req, res) => {
    try {
      const { id } = req.params;

      // Suppression du document correspondant à l'id
      const deletedSwitch = await Switch.findByIdAndDelete(id);

      if (!deletedSwitch) {
        return res.status(404).json({ error: "Switch non trouvé" });
      }

      res.status(200).json({ message: "Switch supprimé avec succès" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
