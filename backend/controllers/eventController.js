const Event = require("../models/Event");
const Club = require("../models/Club");

const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      club,
      category,
      venue,
      startDate,
      endDate,
      registrationDeadline,
      capacity,
      banner,
      status,
    } = req.body;

    // Check required fields
    if (
      !title ||
      !description ||
      !club ||
      !category ||
      !venue ||
      !startDate ||
      !endDate ||
      !registrationDeadline ||
      !capacity
    ) {
      return res.status(400).json({
        message: "All required event fields must be provided",
      });
    }

    // Find the club
    const existingClub = await Club.findById(club);

    if (!existingClub) {
      return res.status(404).json({
        message: "Club not found",
      });
    }

    // Campus Admin can create events for any club
    if (req.user.role === "CAMPUS_ADMIN") {
      // Allowed
    }

    // Club Admin must actually be an admin of this club
    else if (req.user.role === "CLUB_ADMIN") {
      const isClubAdmin = existingClub.admins.some(
        (adminId) => adminId.toString() === req.user.userId
      );

      if (!isClubAdmin) {
        return res.status(403).json({
          message: "You are not an admin of this club",
        });
      }
    }

    // Other roles are not allowed
    else {
      return res.status(403).json({
        message: "You are not authorized to create an event",
      });
    }

    // Convert incoming dates to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);
    const deadline = new Date(registrationDeadline);

    // Validate dates
    if (isNaN(start) || isNaN(end) || isNaN(deadline)) {
      return res.status(400).json({
        message: "Invalid date format",
      });
    }

    if (end <= start) {
      return res.status(400).json({
        message: "End date must be after start date",
      });
    }

    if (deadline >= start) {
      return res.status(400).json({
        message: "Registration deadline must be before the event starts",
      });
    }

    const event = await Event.create({
      title,
      description,
      club,
      category,
      venue,
      startDate: start,
      endDate: end,
      registrationDeadline: deadline,
      capacity,
      banner,
      status,
      createdBy: req.user.userId,
    });

    res.status(201).json({
      message: "Event created successfully",
      event,
    });
  } catch (error) {
    console.error("Create event error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ startDate: 1 });

    res.status(200).json({
      events,
    });
  } catch (error) {
    console.error("Get events error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    res.status(200).json({
      event,
    });
  } catch (error) {
    console.error("Get event error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
module.exports = {
  createEvent,
  getEvents,
  getEventById,
};