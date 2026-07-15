const express = require("express");
const router = express.Router();

const {
  getCodeChefData,
} = require("../controllers/codechefController");

router.get("/:username", getCodeChefData);

module.exports = router;