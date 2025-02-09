const mongoose = require("mongoose");

const switchSchema = mongoose.Schema(
  {
    userOne: Number,
    userTwo: { type: Number, default: null },
    type: {
      type: String,
      enum: ["Offer", "Request"],
    },
    state: {
      type: String,
      enum: ["waiting", "processing", "validate"],
    },
    dateIn: Date,
    dateOut: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Switch", switchSchema);
