const mongoose = require("../connection.js");
require("dotenv").config();

const scheduleSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, unique: true },
    // Option 1 : utiliser Mixed
    schedule: Object,
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);
