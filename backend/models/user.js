const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    contractNR: Number,
    passWord: String,
    firstName: String,
    lastName: String,
    gender: { type: String, enum: ["homme", "femme"] },
    activity: { type: String, enum: ["admin", "viewer", "user"] },
    address: String,
    location: String,
    email: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
