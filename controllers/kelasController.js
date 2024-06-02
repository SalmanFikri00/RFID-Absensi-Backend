import asyncHandler from "express-async-handler";
import Kelas from "../models/kelasModels.js";
import Murid from "../models/muridModels.js";

const getKelasController = asyncHandler(async (req, res) => {
    const allKelas = await Kelas.find();
    return res.status(200).json({ data: allKelas });
});

const getMuridControllerBySingleKelas = asyncHandler(async (req, res) => {
    const { nama_kelas } = req.params;
    const allMurid = await Murid.find({
        kelas: nama_kelas,
    })

    const filteredMurid = allMurid.map(murid => ({
        RF_ID: murid.RF_ID,
        kelas: murid.kelas,
        nama: murid.nama,
        alamat: murid.alamat,
        nis: murid.nis,
    }));

    return res.status(200).json({ data: filteredMurid });
});


// Controller untuk menambahkan kelas
const addKelasController = asyncHandler(async (req, res) => {
    const { nama_kelas } = req.body;
    let editBy = "";

    if (!nama_kelas) {
        return res.status(400).json({ message: "Nama kelas diperlukan" });
    }
    try {
        const newKelas = await Kelas.create({ nama_kelas, edit_by: editBy });
        res.status(201).json({
            message: "Kelas berhasil ditambahkan",
            data: newKelas,
        });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat menambahkan kelas", error });
    }
});

// Controller untuk mengedit kelas
const editKelasController = asyncHandler(async (req, res) => {
    const { id, nama_kelas } = req.body;

    if (!id || !nama_kelas) {
        return res.status(400).json({ message: "ID dan Nama kelas diperlukan" });
    }

    try {
        const kelas = await Kelas.findById(id);

        if (!kelas) {
            return res.status(404).json({ message: "Kelas tidak ditemukan" });
        }

        kelas.nama_kelas = nama_kelas;
        const updatedKelas = await kelas.save();

        res.status(200).json({
            message: "Kelas berhasil diperbarui",
            data: updatedKelas,
        });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat memperbarui kelas", error });
    }
});

// Controller untuk menghapus kelas
const deleteKelasController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id)
    if (!id) {
        return res.status(400).json({ message: "ID diperlukan" });
    }

    try {
        const kelas = await Kelas.findByIdAndDelete(id);
        console.log(kelas)
        if (!kelas) {
            return res.status(404).json({ message: "Kelas tidak ditemukan" });
        }

        
        res.status(200).json({ message: "Kelas berhasil dihapus" });
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat menghapus kelas", error });
    }
});

// Mengekspor controller
export { getKelasController, getMuridControllerBySingleKelas, addKelasController, editKelasController, deleteKelasController };
