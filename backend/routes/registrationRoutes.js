
const express = require("express");

const {
  createRegistration,
  getMyRegistrations,
  getMyEventRegistration,
  cancelRegistration,
} = require("../controllers/registrationController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// All registration routes require authentication
router.use(protect);

// Register for an event
router.post("/", createRegistration);

// Get logged-in student's registrations
router.get("/me", getMyRegistrations);

// Check registration for a particular event
router.get("/me/:eventId", getMyEventRegistration);

// Cancel a registration
router.patch("/:id/cancel", cancelRegistration);

module.exports = router;
