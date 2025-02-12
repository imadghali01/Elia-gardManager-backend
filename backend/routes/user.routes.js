const express = require("express");
const router = express.Router();

const {
  setUser,
  getLogin,
  getUsers,
  putUser,
  delUser,
} = require("../controllers/user.controller");

router.post("/", setUser);

router.get("/login", getLogin);

router.get("/", getUsers);

router.put("/", putUser);

router.delete("/", delUser);

module.exports = router;
