const Switch = require("../models/switch");

module.exports = {
  /**
   * Crée un nouveau switch.
   * Expects dans le body une structure (par exemple) { name: "Nom du switch", state: true/false }
   */
  setSwitch: async (req, res) => {
    try {
      const { userOne, userTwo, type, dateIn, dateOut } = req.body;

    // Vérification des champs obligatoires
    if (!userOne || !type || !dateIn) {
      return res.status(400).json({ message: "Données manquantes" });
      }
      // Création d'une nouvelle instance du modèle à partir des données reçues dans req.body
      const newSwitch = new Switch({
        userOne,
        userTwo: userTwo || null, // Optionnel
        type,
        state: "waiting", // État initial
        dateIn,
        dateOut: dateOut || null, // Optionnel
      });
      await newSwitch.save();
    res.status(201).json({ message: "Switch enregistré avec succès", newSwitch });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'enregistrement", error });
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

  getSwitchBalance: async (req, res) => {
    const userId = req.params.id;

    try {
      // Récupération des switches où l'utilisateur est dans le champ userOne
      const switches = await Switch.find({ userOne: userId });
      let userBalance = 0;
      const msPerDay = 24 * 60 * 60 * 1000; // Nombre de millisecondes dans une journée

      for (let sw of switches) {
        if (sw.state !== "validate") continue;

        // Conversion des dates en objets Date
        const dateIn = new Date(sw.dateIn);
        const dateOut = new Date(sw.dateOut);

        // Calcul de la différence en jours de façon robuste
        // Utilisation de Math.floor et ajout de 1 pour inclure le jour de départ
        const diffDays = Math.floor((dateOut - dateIn) / msPerDay) + 1;

        if (sw.type === "offer") {
          userBalance += diffDays;
        } else if (sw.type === "request") {
          userBalance -= diffDays;
        }
      }

      // Renvoie le résultat sous forme d'entier (nombre de jours)
      res.json({ userBalance });
    } catch (error) {
      console.error("Erreur lors de la récupération des switches:", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  },

  /**
   * Met à jour l'état (state) d'un switch identifié par son id.
   * Expects : dans req.params l'id et dans req.body la nouvelle valeur { state: true/false }
   */
  putSwitchState: async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body; // Prend toutes les clés à mettre à jour

        // Mise à jour dynamique du document avec les nouvelles valeurs
        const updatedSwitch = await Switch.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true } // Retourne le document mis à jour et applique les validateurs
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
