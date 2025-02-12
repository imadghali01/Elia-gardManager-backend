const express = require("express");
const router = express.Router();

const {
  setStatus,
  getStatus,
  putStatus,
} = require("../controllers/status.controller");

router.post("/", setStatus);

router.get("/", getStatus);

router.put("/", putStatus);

module.exports = router;
