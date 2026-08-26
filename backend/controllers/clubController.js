const Club = require("../models/Club");

const createClub = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      logo,
      contactEmail,
      socialLinks,
    } = req.body;

    // Check required fields
    if (!name || !description || !category) {
      return res.status(400).json({
        message: "Name, description and category are required",
      });
    }

    // Only CLUB_ADMIN and CAMPUS_ADMIN can create clubs
    if (!["CLUB_ADMIN", "CAMPUS_ADMIN"].includes(req.user.role)) {
      return res.status(403).json({
        message: "You are not authorized to create a club",
      });
    }

    const club = await Club.create({
      name,
      description,
      category,
      logo,
      contactEmail,
      socialLinks,
      createdBy: req.user.userId,
      admins: [req.user.userId],
    });

    res.status(201).json({
      message: "Club created successfully",
      club,
    });
  } catch (error) {
    console.error("Create club error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find().sort({ createdAt: -1 });

    res.status(200).json({
      clubs,
    });
  } catch (error) {
    console.error("Get clubs error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

const getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);

    if (!club) {
      return res.status(404).json({
        message: "Club not found",
      });
    }

    res.status(200).json({
      club,
    });
  } catch (error) {
    console.error("Get club by ID error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = {
  createClub,
  getAllClubs,
  getClubById,
};