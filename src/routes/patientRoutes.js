
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
} = require("../controllers/patientController");

router.post("/", protect, createPatient);
router.get("/", protect, getPatients);
router.get("/:id", protect, getPatientById);
router.put("/:id", protect, updatePatient);
router.delete("/:id", protect, deletePatient);

module.exports = router;
