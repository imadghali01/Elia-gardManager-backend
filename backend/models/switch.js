const mongoose = require("mongoose");

const switchSchema = mongoose.Schema(
  {
    userOne: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    userTwo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
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
