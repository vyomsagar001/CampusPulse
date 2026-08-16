const express = require("express");

const { createClub } = require("../controllers/clubController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createClub);

module.exports = router;