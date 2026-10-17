
const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
    createMapping,
    getMappings,
    getPatientDoctors,
    deleteMapping
} = require("../controllers/mappingController");

router.post("/", protect, createMapping);
router.get("/", protect, getMappings);
router.get("/:patient_id", protect, getPatientDoctors);
router.delete("/:id", protect, deleteMapping);

module.exports = router;
