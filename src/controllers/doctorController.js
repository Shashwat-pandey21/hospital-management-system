
const prisma = require("../config/db");

// Create a doctor
async function createDoctor(req, res) {
    const name = req.body.name;
    const specialization = req.body.specialization;
    const email = req.body.email;
    const phone = req.body.phone;

    if (!name || !specialization || !email) {
        return res.status(400).json({
            message: "Please provide name, specialization and email"
        });
    }

    try {
        const existingDoctor = await prisma.doctor.findUnique({
            where: { email: email }
        });

        if (existingDoctor) {
            return res.status(400).json({
                message: "Doctor email already exists"
            });
        }

        const doctor = await prisma.doctor.create({
            data: {
                name: name,
                specialization: specialization,
                email: email,
                phone: phone
            }
        });

        res.status(201).json({
            message: "Doctor created successfully",
            doctor: doctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Get all doctors
async function getDoctors(req, res) {
    try {
        const doctors = await prisma.doctor.findMany();

        res.status(200).json({ doctors: doctors });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Get one doctor
async function getDoctorById(req, res) {
    const doctorId = Number(req.params.id);

    if (!Number.isInteger(doctorId) || doctorId <= 0) {
        return res.status(400).json({ message: "Invalid doctor ID" });
    }

    try {
        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId }
        });

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        res.status(200).json({ doctor: doctor });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Update a doctor
async function updateDoctor(req, res) {
    const doctorId = Number(req.params.id);
    const name = req.body.name;
    const specialization = req.body.specialization;
    const email = req.body.email;
    const phone = req.body.phone;

    if (!Number.isInteger(doctorId) || doctorId <= 0) {
        return res.status(400).json({ message: "Invalid doctor ID" });
    }

    if (!name || !specialization || !email) {
        return res.status(400).json({
            message: "Please provide name, specialization and email"
        });
    }

    try {
        const existingDoctor = await prisma.doctor.findUnique({
            where: { id: doctorId }
        });

        if (!existingDoctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        const doctorWithEmail = await prisma.doctor.findUnique({
            where: { email: email }
        });

        if (doctorWithEmail && doctorWithEmail.id !== doctorId) {
            return res.status(400).json({
                message: "Email belongs to another doctor"
            });
        }

        const doctor = await prisma.doctor.update({
            where: { id: doctorId },
            data: {
                name: name,
                specialization: specialization,
                email: email,
                phone: phone
            }
        });

        res.status(200).json({
            message: "Doctor updated successfully",
            doctor: doctor
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Delete a doctor
async function deleteDoctor(req, res) {
    const doctorId = Number(req.params.id);

    if (!Number.isInteger(doctorId) || doctorId <= 0) {
        return res.status(400).json({ message: "Invalid doctor ID" });
    }

    try {
        const doctor = await prisma.doctor.findUnique({
            where: { id: doctorId }
        });

        if (!doctor) {
            return res.status(404).json({
                message: "Doctor not found"
            });
        }

        await prisma.doctor.delete({
            where: { id: doctorId }
        });

        res.status(200).json({
            message: "Doctor deleted successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
}

module.exports = {
    createDoctor,
    getDoctors,
    getDoctorById,
    updateDoctor,
    deleteDoctor
};
