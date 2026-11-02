
const Registration = require("../models/Registration");
const Event = require("../models/Event");

// Register the logged-in student for an event
const createRegistration = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user.userId;

    if (!eventId) {
      return res.status(400).json({
        message: "Event ID is required",
      });
    }

    if (!/^[0-9a-fA-F]{24}$/.test(eventId)) {
      return res.status(400).json({
        message: "Invalid event ID",
      });
    }

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        message: "Event not found",
      });
    }

    if (event.status !== "PUBLISHED") {
      return res.status(400).json({
        message: "This event is not open for registration",
      });
    }

    if (new Date() > event.registrationDeadline) {
      return res.status(400).json({
        message: "Registration deadline has passed",
      });
    }

    // Check for an existing registration
    let registration = await Registration.findOne({
      eventId,
      userId,
    });

    if (registration && registration.status !== "CANCELLED") {
      return res.status(200).json({
        message: "You are already registered for this event",
        registration,
      });
    }

    // Count confirmed registrations
    const confirmedCount = await Registration.countDocuments({
      eventId,
      status: "CONFIRMED",
    });

    const status =
      confirmedCount >= event.capacity ? "WAITLISTED" : "CONFIRMED";

    // Reactivate a cancelled registration
    if (registration) {
      registration.status = status;
      registration.registeredAt = new Date();
      await registration.save();
    } else {
      registration = await Registration.create({
        eventId,
        userId,
        status,
      });
    }

    return res.status(201).json({
      message:
        status === "CONFIRMED"
          ? "Registration successful"
          : "Event is full. You have been added to the waitlist",
      registration,
    });
  } catch (error) {
    console.error("Create registration error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "You are already registered for this event",
      });
    }

    return res.status(500).json({
      message: "Server error while registering",
    });
  }
};


// Get all registrations of the logged-in student
const getMyRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find({
      userId: req.user.userId,
    }).sort({ registeredAt: -1 });

    return res.status(200).json({
      registrations,
    });
  } catch (error) {
    console.error("Get registrations error:", error);

    return res.status(500).json({
      message: "Server error while fetching registrations",
    });
  }
};


// Get the logged-in student's registration for a particular event
const getMyEventRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;

    if (!/^[0-9a-fA-F]{24}$/.test(eventId)) {
      return res.status(400).json({
        message: "Invalid event ID",
      });
    }

    const registration = await Registration.findOne({
      eventId,
      userId: req.user.userId,
    });

    return res.status(200).json({
      registration,
    });
  } catch (error) {
    console.error("Get event registration error:", error);

    return res.status(500).json({
      message: "Server error while fetching registration",
    });
  }
};


// Cancel the logged-in student's registration
const cancelRegistration = async (req, res) => {
  try {
    const registration = await Registration.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!registration) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    if (registration.status === "CANCELLED") {
      return res.status(400).json({
        message: "Registration is already cancelled",
      });
    }

    registration.status = "CANCELLED";
    await registration.save();

    return res.status(200).json({
      message: "Registration cancelled successfully",
      registration,
    });
  } catch (error) {
    console.error("Cancel registration error:", error);

    return res.status(500).json({
      message: "Server error while cancelling registration",
    });
  }
};


module.exports = {
  createRegistration,
  getMyRegistrations,
  getMyEventRegistration,
  cancelRegistration,
};
