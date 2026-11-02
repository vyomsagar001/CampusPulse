
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,
      enum: ["CONFIRMED", "WAITLISTED", "CANCELLED", "PENDING"],
      default: "CONFIRMED",
    },

    registeredAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate registrations for the same event and user
registrationSchema.index(
  { eventId: 1, userId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Registration", registrationSchema);
