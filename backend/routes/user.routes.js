const express = require("express");
const router = express.Router();

const {
  setUser,
  login,
  getUsers,
  putUser,
  delUser,
} = require("../controllers/user.controller.js");

router.post("/", setUser);

router.post("/login", login);

router.get("/", getUsers);

router.put("/:id", putUser);

router.delete("/:id", delUser);

module.exports = router;
