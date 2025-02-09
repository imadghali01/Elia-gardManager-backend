const userSchema = require("../models/user");

module.exports = {
  setUser: async (req, res) => {
    console.log("ca marche");
    res.json("ca marche");
  },
  getUsers: async (req, res) => {
    console.log("ca marche aussi");
    res.json("ca marche aussi");
  },
  getLogin: async (req, res) => {
    console.log("ca marche encore");
    res.json("ca marche encore");
  },
  putUser: async (req, res) => {
    console.log("la meme");
    res.json("la meme");
  },
  delUser: async (req, res) => {
    console.log("toujours la meme");
    res.json("toujours la meme");
  },
};
