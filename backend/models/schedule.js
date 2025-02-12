const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true, // 👈 Empêche user: null
    },
    schedule: {
      type: Map, // ✅ Accepte un objet { "Lundi": [...] }
      of: {
        type: Array,
        validate: {
          validator: function (value) {
            return Array.isArray(value) && value.length === 3;
          },
          message: "Chaque valeur du schedule doit être un tableau de trois éléments [horaire, userId, statut].",
        },
      },
      default: new Map(),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
