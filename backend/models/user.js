const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: String,
    passWord: String,
    fullName: String,
    gender: { type: String, enum: ["homme", "femme"] },
    activity: { type: String, enum: ["admin", "viewer", "user"] },
    address: String,
    location: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
