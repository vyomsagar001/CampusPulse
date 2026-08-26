const express = require("express");

const {
  createClub,
  getAllClubs,
  getClubById,
} = require("../controllers/clubController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getAllClubs);

router.get("/:id", getClubById);

router.post("/", protect, createClub);

module.exports = router;