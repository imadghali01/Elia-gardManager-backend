const mongoose = require("mongoose");

const statusSchema = mongoose.Schema(
  {
    user: { type: String, required: true },
    State: {
      type: String,
      enum: ["up", "ongard", "sickness", "holidays"],
      default: "up",
    },
    statusIn: Date,
    statusOut: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Status", statusSchema);
