const mongoose = require("mongoose");

const statusSchema = mongoose.Schema(
  {
    user: { type: Number, unique: true, required: true },
    State: {
      type: String,
      enum: ["Up", "Ongard", "Sickness", "Holidays"],
      default: "Up",
    },
    statusIn: Date,
    statusOut: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Status", statusSchema);
