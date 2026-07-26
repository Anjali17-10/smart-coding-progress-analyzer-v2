const express = require("express");

const {
  getUserInfo,
  getSolvedCount,
  getRatingHistory,
} = require("../controllers/codeforcesController");

const router = express.Router();

router.get("/:handle", getUserInfo);

router.get("/:handle/solved", getSolvedCount);

router.get("/:handle/history", getRatingHistory);

module.exports = router;