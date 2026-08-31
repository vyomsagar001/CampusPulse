const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        // Optional because Google-authenticated users
        // do not have a CampusPulse password.
        password: {
            type: String
        },

        // Google account identifier
        googleId: {
            type: String,
            unique: true,
            sparse: true
        },

        role: {
            type: String,
            enum: ["STUDENT", "CLUB_ADMIN", "CAMPUS_ADMIN"],
            default: "STUDENT"
        },

        studentId: {
            type: String,
            trim: true
        },

        academic: {
            department: {
                type: String,
                trim: true
            },

            year: {
                type: Number
            }
        },

        interests: {
            type: [String],
            default: []
        },

        skills: {
            type: [String],
            default: []
        },

        profile: {
            profilePicture: {
                type: String
            },

            bio: {
                type: String,
                trim: true
            },

            phone: {
                type: String
            }
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("User", userSchema);