const mongoose = require("../connection.js");
require("dotenv").config();

const userSchema = new mongoose.Schema(
  {
    contractNR: Number,
    passWord: String,
    firstName: String,
    lastName: String,
    gender: { type: String, enum: ["Homme", "Femme"] },
    activity: { type: String, enum: ["Admin", "Viewer", "User"] },
    address: String,
    location: String,
    email: String,
    phone: String,
  },
  { timestamps: true }
);

async function run() {
  const user = await User.create(
    {
      contractNR: "123456",
      passWord: "imadbecode",
      firstName: "imad",
      lastName: "ghali",
      gender: "Homme",
      activity: "Admin",
      address: "something",
      location: "something",
      email: "imadghali01@gmail.com",
      phone: "0000/00/00",
    },
    { timestamps: true }
  );
}
run();

const User = mongoose.model("User", userSchema);
