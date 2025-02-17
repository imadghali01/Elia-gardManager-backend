const Switch = require("../models/switch");
const Schedule = require("../models/Schedule");
module.exports = {
  setSwitch: async (req, res) => {
    try {
      const { userOne, userTwo, type, dateIn, dateOut } = req.body;

      // 1) Vérification de la présence des champs requis
      if (!userOne || !userTwo || !type || !dateIn || !dateOut) {
        return res.status(400).json({
          message:
            "Champs manquants : userOne, userTwo, type, dateIn, dateOut requis.",
        });
      }

      // 2) Création / enregistrement du nouveau Switch
      const newSwitch = new Switch({
        userOne,
        userTwo,
        type,
        state: "waiting",
        dateIn,
        dateOut,
      });
      await newSwitch.save();

      // 3) Convertir dateIn / dateOut en objets Date pour comparaison
      const dIn = new Date(dateIn);
      const dOut = new Date(dateOut);

      // 4) Récupération de tous les Schedules (ou filtrés selon ta logique)
      //    Ici, on les prend tous, puis on testera en code si au moins une date est dans [dIn, dOut].
      const allSchedules = await Schedule.find({});

      // On va stocker ici les plannings qui ont été effectivement modifiés
      const updatedSchedules = [];

      // 5) Parcours de chaque Schedule pour voir s’il contient AU MOINS UNE date dans l’intervalle
      for (const schedule of allSchedules) {
        let hasDateInRange = false; // Pour savoir si on a rencontré au moins UNE date dans [dIn, dOut]
        let scheduleNeedsSave = false; // Pour savoir si on a modifié quelque chose dans ce schedule

        // Parcours de tous les shifts (shift1, shift2, etc.)
        for (const shiftKey in schedule.shifts) {
          const shift = schedule.shifts[shiftKey];

          // Parcours de chaque jour (lundi, mardi, etc.)
          for (const dayKey in shift) {
            const dayData = shift[dayKey];
            // Format attendu : [ dateJour, userId, statusId ]

            if (!Array.isArray(dayData) || dayData.length < 2) {
              // Données invalides ou incomplètes, on ignore
              continue;
            }

            const [currentDate, assignedUser] = dayData;

            // Vérifie si la date du jour est dans l'intervalle [dIn, dOut]
            if (currentDate >= dIn && currentDate <= dOut) {
              hasDateInRange = true;

              // Si c'est l'userOne, on le remplace par userTwo
              if (String(assignedUser) === String(userOne)) {
                dayData[1] = userTwo;
                scheduleNeedsSave = true;
              }
            }
          }
        }

        // Si le schedule contient au moins une date dans l’intervalle
        // et qu’on a fait au moins un changement (scheduleNeedsSave),
        // on enregistre le planning modifié.
        if (hasDateInRange && scheduleNeedsSave) {
          await schedule.save();
          updatedSchedules.push(schedule);
        }
        // Si le schedule a une date dans l’intervalle mais qu’aucun remplacement userOne -> userTwo
        // n’a été fait, on ne le push pas dans updatedSchedules.
        // À toi d’adapter selon que tu veuilles quand même le renvoyer ou pas.
      }

      // 6) Réponse
      //    - On peut décider de retourner un 200 même si aucun schedule n’a été mis à jour
      //      ou, comme ci-dessous, préciser quand rien n’a changé.
      if (updatedSchedules.length === 0) {
        return res.status(200).json({
          message:
            "Switch créé, mais aucun schedule n'a été mis à jour (aucune date concernée ou aucun userOne à remplacer).",
          switch: newSwitch,
          updatedSchedules,
        });
      }

      return res.status(200).json({
        message: "Switch créé et schedules mis à jour avec succès.",
        switch: newSwitch,
        updatedSchedules,
      });
    } catch (error) {
      return res.status(500).json({
        message:
          "Erreur lors de la création du switch ou de la mise à jour des plannings",
        error: error.message,
      });
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
