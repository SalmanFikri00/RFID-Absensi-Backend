import asyncHandler from "express-async-handler";
import moment from "moment";
import Iot from "../models/iotModels.js";
import Murid from "../models/muridModels.js";
import Absen from "../models/absenModel.js";

const getAbsensi = asyncHandler(async (req, res) => {
    const Absensi = await Absen.find();
    return res.status(200).json({ data: Absensi });
});

const getAbsensiByKelas = asyncHandler(async (req, res) => {
    const { kelas } = req.params;
    const findKelas = await Absen.find({ kelas });
    return res.status(200).json({ data: findKelas });
});

const getAbsensiByTanggal = asyncHandler(async(req, res) => {
    const { tanggal } = req.params;
    console.log(tanggal)
    const findTanggal = await Absen.find({ tanggal });
    return res.status(200).json({ data: findTanggal });
})

const updateDataMurid = asyncHandler(async (req, res) => {
    const { data } = req.body; // Asumsi data diterima dalam req.body.data
    console.log(data)
    try {
        // Iterasi melalui data dan perbarui database
        for (const murid of data) {
            const { RF_ID, kelas, nama, alamat, nis } = murid;
            await Murid.updateOne({ RF_ID }, { kelas, nama, alamat, nis }, { upsert: true });
        }
        // Mengambil data yang sudah diperbarui
        const updatedMurid = await Murid.find({}).select("RF_ID kelas nama alamat nis").lean();

        // Mengembalikan hasil sebagai JSON
        res.status(200).json({ data: updatedMurid });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


export { getAbsensi, getAbsensiByKelas, updateDataMurid, getAbsensiByTanggal };
