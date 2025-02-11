const mongoose = require("mongoose");

const statusSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    state: {
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
