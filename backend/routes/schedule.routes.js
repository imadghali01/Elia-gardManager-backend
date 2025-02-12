const express = require("express");
const router = express.Router();

const {
  setSchedule,
  getSchedule,
  putSchedule,
  delSchedule,
} = require("../controllers/schedule.controller.js");

router.post("/", setSchedule);

router.get("/:id", getSchedule);

router.put("/:id", putSchedule);

router.delete("/:id", delSchedule);

module.exports = router;
