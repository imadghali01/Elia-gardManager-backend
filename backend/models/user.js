const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: String,
    passWord: String,
    fullName: String,
    gender: { type: String, enum: ["Mr", "Mrs"] },
    activity: { type: String, enum: ["Admin", "Viewer", "User"] },
    address: String,
    location: String,
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
