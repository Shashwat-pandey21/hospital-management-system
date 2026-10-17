
const prisma = require("../config/db");

// Create a patient
async function createPatient(req, res) {
    const name = req.body.name;
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const address = req.body.address;
    const phone = req.body.phone;

    if (!name || !req.body.age || !gender || !Number.isInteger(age) || age <= 0) {
        return res.status(400).json({
            message: "Please provide a valid name, age and gender"
        });
    }

    try {
        const patient = await prisma.patient.create({
            data: {
                name: name,
                age: age,
                gender: gender,
                address: address,
                phone: phone,
                userId: req.user.id
            }
        });

        res.status(201).json({
            message: "Patient created successfully",
            patient: patient
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Get all patients belonging to the logged-in user
async function getPatients(req, res) {
    try {
        const patients = await prisma.patient.findMany({
            where: { userId: req.user.id }
        });

        res.status(200).json({ patients: patients });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Get one patient
async function getPatientById(req, res) {
    const patientId = Number(req.params.id);

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

        res.status(200).json({ patient: patient });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Update a patient
async function updatePatient(req, res) {
    const patientId = Number(req.params.id);
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const address = req.body.address;
    const phone = req.body.phone;

    if (!Number.isInteger(patientId) || patientId <= 0) {
        return res.status(400).json({ message: "Invalid patient ID" });
    }

    if (age !== undefined &&
        (!Number.isInteger(Number(age)) || Number(age) <= 0)) {
        return res.status(400).json({ message: "Invalid age" });
    }

    try {
        const existingPatient = await prisma.patient.findFirst({
            where: {
                id: patientId,
                userId: req.user.id
            }
        });

        if (!existingPatient) {
            return res.status(404).json({
                message: "Patient not found"
            });
        }

        const patient = await prisma.patient.update({
            where: { id: patientId },
            data: {
                name: name,
                age: age === undefined ? undefined : Number(age),
                gender: gender,
                address: address,
                phone: phone
            }
        });

        res.status(200).json({
            message: "Patient updated successfully",
            patient: patient
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Delete a patient
async function deletePatient(req, res) {
    const patientId = Number(req.params.id);

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

        await prisma.patient.delete({
            where: { id: patientId }
        });

        res.status(200).json({
            message: "Patient deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {
    createPatient,
    getPatients,
    getPatientById,
    updatePatient,
    deletePatient
};
