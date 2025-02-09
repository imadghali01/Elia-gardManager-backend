const switchSchema = require("../models/switch");

module.exports = {
  setSwitch: async (req, res) => {
    console.log("la meme ");
  },
  getSwitchs: async (req, res) => {
    res.json("c ok ");
  },
  putSwitchState: async (req, res) => {
    console.log("ca marche toujours");
  },
  delSwitch: async (req, res) => {
    console.log("la meme ");
  },
};
