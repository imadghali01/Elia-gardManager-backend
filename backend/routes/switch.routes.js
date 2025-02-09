const express = require("express");
const router = express.Router();

const {
  setSwitch,
  getSwitchs,
  putSwitchState,
  delSwitch,
} = require("../controllers.js/switch.controller.js");

router.post("/", setSwitch);

router.get("/", getSwitchs);

router.put("/", putSwitchState);

router.delete("/", delSwitch);

module.exports = router;
