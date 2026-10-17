
const prisma = require("../config/db");

// Assign a doctor to a patient
async function createMapping(req, res) {
    const patientId = Number(req.body.patientId);
    const doctorId = Number(req.body.doctorId);

    if (!Number.isInteger(patientId) || patientId <= 0 ||
        !Number.isInteger(doctorId) || doctorId <= 0) {
        return res.status(400).json({
            message: "Please provide valid patientId and doctorId"
        });
    }

    try {
        const patient = await prisma.patient.findFirst({
            where: {
                id: patientId,
                userId: req.user.id
            }
        });

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId }
        });

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        const existingMapping = await prisma.patientDoctor.findFirst({
            where: {
                patientId: patientId,
                doctorId: doctorId
            }
        });

        if (existingMapping) {
            return res.status(400).json({
                message: "Doctor is already assigned to this patient"
            });
        }

        const mapping = await prisma.patientDoctor.create({
            data: {
                patientId: patientId,
                doctorId: doctorId
            }
        });

        res.status(201).json({
            message: "Doctor assigned successfully",
            mapping: mapping
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Get mappings for the logged-in user's patients
async function getMappings(req, res) {
    try {
        const mappings = await prisma.patientDoctor.findMany({
            where: {
                patient: {
                    userId: req.user.id
                }
            },
            include: {
                patient: true,
                doctor: true
            }
        });

        res.status(200).json({ mappings: mappings });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Get all doctors assigned to one patient
async function getPatientDoctors(req, res) {
    const patientId = Number(req.params.patient_id);

    if (!Number.isInteger(patientId) || patientId <= 0) {
        return res.status(400).json({ message: "Invalid patient ID" });
    }

    try {
        const patient = await prisma.patient.findFirst({
            where: {
                id: patientId,
                userId: req.user.id
            }
        });

        if (!patient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        const mappings = await prisma.patientDoctor.findMany({
            where: { patientId: patientId },
            include: { doctor: true }
        });

        const doctors = [];

        for (let i = 0; i < mappings.length; i++) {
            doctors.push(mappings[i].doctor);
        }

        res.status(200).json({ doctors: doctors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Remove a doctor assignment
async function deleteMapping(req, res) {
    const mappingId = Number(req.params.id);

    if (!Number.isInteger(mappingId) || mappingId <= 0) {
        return res.status(400).json({ message: "Invalid mapping ID" });
    }

    try {
        const mapping = await prisma.patientDoctor.findFirst({
            where: {
                id: mappingId,
                patient: {
                    userId: req.user.id
                }
            }
        });

        if (!mapping) {
            return res.status(404).json({
                message: "Mapping not found"
            });
        }

        await prisma.patientDoctor.delete({
            where: { id: mappingId }
        });

        res.status(200).json({
            message: "Doctor assignment removed successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {
    createMapping,
    getMappings,
    getPatientDoctors,
    deleteMapping
};
