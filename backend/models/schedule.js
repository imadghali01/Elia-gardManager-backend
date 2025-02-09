const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema(
  {
    user: { type: Number, required: true, unique: true },
    // Option 1 : utiliser Mixed
    schedule: { type: [mongoose.Schema.Types.Mixed] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", scheduleSchema);
