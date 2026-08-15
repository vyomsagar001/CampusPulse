const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/userController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected test route
router.get("/profile", protect, (req, res) => {
    res.status(200).json({
        message: "You accessed a protected route",
        user: req.user
    });
});

module.exports = router;