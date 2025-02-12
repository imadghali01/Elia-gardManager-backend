const Schedule = require("../models/schedule");
const mongoose = require("mongoose");

// Fonction pour générer un planning de 6 semaines
const generateWeeksSchedule = (userId) => {
    const weeks = [];
    const startDate = new Date(); // Date actuelle

    for (let week = 0; week < 6; week++) {
        const days = {};
        const weekStartDate = new Date(startDate);
        weekStartDate.setDate(startDate.getDate() + week * 7);

        ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"].forEach((day, index) => {
            const dayDate = new Date(weekStartDate);
            dayDate.setDate(weekStartDate.getDate() + index);

            days[day] = [{ date: dayDate, user: userId, status: new mongoose.Types.ObjectId() }]; // Génère une entrée par défaut
        });

        weeks.push({ weekNumber: week + 1, days });
    }

    return weeks;
};

// ✅ **1. Ajouter un planning de 6 semaines pour un utilisateur**
module.exports.createSchedule = async (req, res) => {
    try {
        const { user } = req.body;

        if (!user) {
            return res.status(400).json({ message: "L'ID de l'utilisateur est requis." });
        }

        const newSchedule = new Schedule({
            user,
            weeks: generateWeeksSchedule(user),
        });

        await newSchedule.save();
        res.status(201).json({ message: "Planning généré avec succès", schedule: newSchedule });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ **2. Récupérer le planning d'un utilisateur**
module.exports.getUserSchedule = async (req, res) => {
    try {
        const { userId } = req.params;

        const schedule = await Schedule.findOne({ user: userId }).populate("user").populate("weeks.days.user").populate("weeks.days.status");

        if (!schedule) {
            return res.status(404).json({ message: "Aucun planning trouvé pour cet utilisateur." });
        }

        res.status(200).json(schedule);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ **3. Mettre à jour un jour spécifique dans une semaine**
module.exports.updateDaySchedule = async (req, res) => {
    try {
        const { userId, weekNumber, day } = req.params;
        const { status } = req.body;

        const schedule = await Schedule.findOne({ user: userId });

        if (!schedule) {
            return res.status(404).json({ message: "Planning non trouvé." });
        }

        const week = schedule.weeks.find(w => w.weekNumber === parseInt(weekNumber));

        if (!week || !week.days[day]) {
            return res.status(404).json({ message: "Jour ou semaine introuvable." });
        }

        week.days[day][0].status = status; // Mise à jour du statut

        await schedule.save();
        res.status(200).json({ message: "Planning mis à jour", schedule });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ✅ **4. Supprimer un planning**
module.exports.deleteSchedule = async (req, res) => {
    try {
        const { userId } = req.params;

        const deletedSchedule = await Schedule.findOneAndDelete({ user: userId });

        if (!deletedSchedule) {
            return res.status(404).json({ message: "Planning non trouvé." });
        }

        res.status(200).json({ message: "Planning supprimé avec succès." });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
