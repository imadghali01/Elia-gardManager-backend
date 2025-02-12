const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  weeks: [
    {
      weekNumber: Number,
      days: {
        lundi: [{ 
          date: Date, 
          user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
          status: { type: mongoose.Schema.Types.ObjectId, ref: "Status" },
          timeSlot: String // Ajout du créneau horaire (ex: "08:00 - 12:00")
        }],
        mardi: [{ date: Date, user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, status: { type: mongoose.Schema.Types.ObjectId, ref: "Status" }, timeSlot: String }],
        mercredi: [{ date: Date, user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, status: { type: mongoose.Schema.Types.ObjectId, ref: "Status" }, timeSlot: String }],
        jeudi: [{ date: Date, user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, status: { type: mongoose.Schema.Types.ObjectId, ref: "Status" }, timeSlot: String }],
        vendredi: [{ date: Date, user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, status: { type: mongoose.Schema.Types.ObjectId, ref: "Status" }, timeSlot: String }],
        samedi: [{ date: Date, user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, status: { type: mongoose.Schema.Types.ObjectId, ref: "Status" }, timeSlot: String }],
        dimanche: [{ date: Date, user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, status: { type: mongoose.Schema.Types.ObjectId, ref: "Status" }, timeSlot: String }]
      }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Schedule", scheduleSchema);
