const mongoose = require("../connection.js");
require("dotenv").config();

const statusSchema = new mongoose.Schema(
  {
    user: Number,
    State: {
      type: String,
      enum: ["Disponible", "OnGard", "Sickness", "holydays"],
      default: "Disponible",
    },
    statusIn: Date,
    statusOut: Date,
  },
  { timestamps: true }
);

const Status = mongoose.model("Status", statusSchema);
