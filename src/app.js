
const express = require("express");

const app = express();

const authRoutes = require("./routes/authRoutes");
const patientRoutes = require("./routes/patientRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const mappingRoutes = require("./routes/mappingRoutes");
const { protect } = require("./middleware/authMiddleware");

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Hospital Management System API is running"
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/mappings", mappingRoutes);

app.get("/api/test", protect, (req, res) => {
    res.json({
        message: "Token is valid",
        userId: req.user.id
    });
});

module.exports = app;
