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

router.put("/:id", putSwitchState);

router.delete("/:id", delSwitch);

module.exports = router;
