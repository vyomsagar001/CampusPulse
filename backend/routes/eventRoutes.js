const express = require("express");

const {
  createEvent,
  getEvents,
  getEventById,
} = require("../controllers/eventController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get all events
router.get("/", getEvents);

// Get single event
router.get("/:id", getEventById);

// Create event
router.post("/", protect, createEvent);

module.exports = router;