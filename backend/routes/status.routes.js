const express = require("express");
const router = express.Router();

const {
  setStatus,
  getStatus,
  putStatus,
} = require("../controllers/status.controller.js");

router.post("/", setStatus);

router.get("/", getStatus);

router.put("/:id", putStatus);

module.exports = router;
