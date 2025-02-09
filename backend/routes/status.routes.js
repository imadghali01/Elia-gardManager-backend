const express = require("express");
const router = express.Router();

const {
  setStatus,
  getStatus,
  putStatus,
} = require("../controllers.js/status.controller.js");

router.post("/", setStatus);

router.get("/", getStatus);

router.put("/", putStatus);

module.exports = router;
