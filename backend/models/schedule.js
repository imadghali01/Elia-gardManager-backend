const mongoose = require("mongoose");

// Définition d'un schéma vide avec strict: false pour accepter n'importe quel champ
const scheduleSchema = new mongoose.Schema(
    {},

  
    { strict: false, timestamps: true } // sert à enregistrer automatiquement la date et l'heure de création du document dans MongoDB.
);

// Exportation du modèle "Schedule" qui utilisera la collection "schedules" dans MongoDB
module.exports = mongoose.model("Schedule", scheduleSchema);
