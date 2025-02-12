const express = require("express");
const router = express.Router();

const {
  setSwitch,
  getSwitchs,
  putSwitchState,
  getSwitchBalance,
  delSwitch,
} = require("../controllers.js/switch.controller.js");

router.post("/", setSwitch);

router.get("/", getSwitchs);

router.get("/:id", getSwitchBalance);

router.put("/:id", putSwitchState);

router.delete("/:id", delSwitch);

module.exports = router;
