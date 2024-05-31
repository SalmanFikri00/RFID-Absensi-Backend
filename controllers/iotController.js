import asyncHandler from "express-async-handler";
import Iot from "../models/iotModels.js";
import Kelas from "../models/kelasModels.js";

// Fungsi untuk menambahkan data ke model Iot
const setIotData = asyncHandler(async (req, res) => {
    const { kode_id, mode } = req.body;

    if (!kode_id || !mode) {
        return res.status(400).json({ message: "Kode ID dan Mode diperlukan" });
    }

    const exists = await Iot.findOne({ kode_id });

    const existsKelas = await Kelas.findOne({
        nama_kelas: mode,
    });

    if (!exists) {
        const newIot = await Iot.create({ kode_id, mode });
        return res.status(201).json({
            message: "berhasil di set",
            data: newIot,
        });
    }

    exists.mode = mode;
    await exists.save();

    // if existsKelas is found, update it
    if (existsKelas) {
        existsKelas.edit_by = kode_id;
        await existsKelas.save();
    }

    res.json({
        message: "berhasil di set",
        data: existsKelas,
    });
});

// Mengekspor controller
export { setIotData };
