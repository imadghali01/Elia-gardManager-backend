const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema(
  {
    schedule: {
      type: Map,
      of: {
        type: Array,
        validate: {
          validator: function (value) {
            return Array.isArray(value) && value.length === 3;
          },
          message:
            "Chaque valeur du schedule doit être un tableau de deux éléments [date, userId, status].",
        },
      },
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
