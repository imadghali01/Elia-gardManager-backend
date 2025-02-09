const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URI);
    console.log("Connecté à myTask");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB;
