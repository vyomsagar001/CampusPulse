const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    club: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },

    category: {
      type: String,
      enum: [
        "TECHNICAL",
        "CULTURAL",
        "SPORTS",
        "ACADEMIC",
        "WORKSHOP",
        "HACKATHON",
        "OTHER",
      ],
      required: true,
    },

    venue: {
      type: String,
      required: true,
      trim: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    registrationDeadline: {
      type: Date,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
      min: 1,
    },

    banner: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "DRAFT",
        "PUBLISHED",
        "ONGOING",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "DRAFT",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);