const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const googleClient = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID
);


// Register a new user
const registerUser = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            studentId,
            academic,
            interests,
            skills,
            profile
        } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email, and password are required"
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User with this email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            studentId,
            academic,
            interests,
            skills,
            profile
        });

        // Send response without password
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Registration error:", error.message);

        res.status(500).json({
            message: "Server error during registration"
        });
    }
};


// Login an existing user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Make sure this user has a password
        if (!user.password) {
            return res.status(401).json({
                message: "This account uses Google Sign-In"
            });
        }

        // Compare entered password with hashed password
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Create CampusPulse JWT
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Send response
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).json({
            message: "Server error during login"
        });
    }
};


// Google Login
const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        // Check if Google credential was received
        if (!credential) {
            return res.status(400).json({
                message: "Google credential is required"
            });
        }

        // Verify Google ID token
        const ticket = await googleClient.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        const payload = ticket.getPayload();

        if (!payload) {
            return res.status(401).json({
                message: "Invalid Google token"
            });
        }

        const {
            sub: googleId,
            email,
            name,
            picture,
            email_verified
        } = payload;

        // Make sure Google verified the email
        if (!email || !email_verified) {
            return res.status(401).json({
                message: "Google email could not be verified"
            });
        }

        // First: find user using Google ID
        let user = await User.findOne({ googleId });

        // Second: if Google ID is not linked,
        // check whether this email already exists
        if (!user) {
            user = await User.findOne({ email });

            if (user) {
                // Link this existing CampusPulse account
                // to the Google account
                user.googleId = googleId;

                // Add Google profile picture if one doesn't exist
                if (!user.profile?.profilePicture && picture) {
                    user.profile = {
                        ...(user.profile?.toObject?.() || {}),
                        profilePicture: picture
                    };
                }

                await user.save();
            }
        }

        // Third: create a new CampusPulse user
        if (!user) {
            user = await User.create({
                name: name || email.split("@")[0],
                email,
                googleId,
                role: "STUDENT",
                profile: {
                    profilePicture: picture || undefined
                }
            });
        }

        // Create CampusPulse JWT
        const token = jwt.sign(
            {
                userId: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        // Send authenticated user back to frontend
        res.status(200).json({
            message: "Google login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                studentId: user.studentId,
                academic: user.academic,
                interests: user.interests,
                skills: user.skills,
                profile: user.profile
            }
        });

    } catch (error) {
        console.error("Google login error:", error);

        res.status(401).json({
            message: "Google authentication failed"
        });
    }
};


// Export controllers
module.exports = {
    registerUser,
    loginUser,
    googleLogin
};