const mongoose = require("mongoose");

const switchSchema = mongoose.Schema(
  {
    userOne: String,
    userTwo: { type: String, default: null },
    type: {
      type: String,
      enum: ["offer", "request"],
    },
    state: {
      type: String,
      enum: ["waiting", "processing", "validate"],
      default: "waiting",
    },
    dateIn: Date,
    dateOut: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Switch", switchSchema);
