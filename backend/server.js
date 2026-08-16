require("dotenv").config();

const express = require("express");
const connectDB = require("./db");
const userRoutes = require("./routes/userRoutes");
const clubRoutes = require("./routes/clubRoutes");
const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/clubs", clubRoutes);
const PORT = process.env.PORT || 5000;

connectDB();

app.get("/api/health", (req, res) => {
    res.json({
        message: "CampusPulse API is running"
    });
});

app.listen(PORT, () => {
    console.log(`CampusPulse server running on http://localhost:${PORT}`);
});