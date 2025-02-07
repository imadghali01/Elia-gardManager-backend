const mongoose = require("../connection.js");
require("dotenv").config();

const switchSchema = new mongoose.Schema(
  {
    userOne: Number,
    userTwo: { type: Number, default: null },
    dateIn: Date,
    dateOut: Date,
  },
  { timestamps: true }
);

const Switch = mongoose.model("Switch", switchSchema);
