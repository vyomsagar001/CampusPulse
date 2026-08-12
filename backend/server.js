require("dotenv").config();

const express = require("express");
const connectDB = require("./db");
const Test = require("./models/Test");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.get("/api/health", (req, res) => {
    res.json({
        message: "CampusPulse API is running"
    });
});

app.post("/api/test", async (req, res) => {
    try {
        const test = await Test.create({
            message: req.body.message
        });

        res.status(201).json(test);
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`CampusPulse server running on http://localhost:${PORT}`);
});