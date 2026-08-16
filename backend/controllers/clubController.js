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

module.exports = {
  createClub,
};