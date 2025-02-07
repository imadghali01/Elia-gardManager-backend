const express = require("express");
const router = express.Router();
const mongoose = require("../connection.js");

router.post("/add_schedule", async (req, res) => {
  async function addScheduleForUsers() {
    try {
      const users = await User.find();
      if (users.length === 0) {
        console.log("⚠️ Aucun utilisateur trouvé !");
        return;
      }

      for (const user of users) {
        const existingSchedule = await Schedule.findOne({ email: user.email });
        if (!existingSchedule) {
          await Schedule.create({ email: user.email });
          console.log(`✅ Planning ajouté pour ${user.email}`);
        }
      }
    } catch (error) {
      console.error("❌ Erreur lors de la création des plannings :", error);
    }
  }
});

module.exports = router;
