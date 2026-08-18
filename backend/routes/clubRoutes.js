const express = require("express");

const {
  createClub,
  getAllClubs,
} = require("../controllers/clubController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllClubs);
router.post("/", protect, createClub);

module.exports = router;