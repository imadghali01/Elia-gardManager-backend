const Schedule = require("../models/schedule");

// ✅ Ajouter un horaire
module.exports.setSchedule = async (req, res) => {
  try {
    console.log("Requête reçue :", req.body);  // 🔍 Vérification des données reçues

    const { user, schedule } = req.body;

    // Vérification : empêcher les requêtes sans `user`
    if (!user) {
      return res.status(400).json({ error: "Le champ user est requis." });
    }

    const newSchedule = new Schedule({ user, schedule });
    await newSchedule.save();
    
    res.status(201).json({ message: "Horaire ajouté avec succès", schedule: newSchedule });
  } catch (error) {
    console.error("Erreur dans setSchedule :", error);
    res.status(500).json({ error: error.message });
  }
};

// ✅ Récupérer tous les horaires
module.exports.getSchedule = async (req, res) => {
  try {
    const schedules = await Schedule.find();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Modifier un horaire
module.exports.putSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { schedule } = req.body;
    
    const updatedSchedule = await Schedule.findByIdAndUpdate(id, { schedule }, { new: true });
    
    if (!updatedSchedule) {
      return res.status(404).json({ message: "Horaire non trouvé" });
    }

    res.status(200).json({ message: "Horaire mis à jour", schedule: updatedSchedule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Supprimer un horaire
module.exports.delSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedSchedule = await Schedule.findByIdAndDelete(id);
    
    if (!deletedSchedule) {
      return res.status(404).json({ message: "Horaire non trouvé" });
    }

    res.status(200).json({ message: "Horaire supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
