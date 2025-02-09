const express = require("express");
const router = express.Router();

const {
  setSchedule,
  getSchedule,
  putSchedule,
  delSchedule,
} = require("../controllers.js/schedule.controller.js");

router.post("/", setSchedule);

router.get("/", getSchedule);

router.put("/", putSchedule);

router.delete("/", delSchedule);

module.exports = router;
