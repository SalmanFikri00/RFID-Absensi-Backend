import asyncHandler from "express-async-handler";
import moment from "moment";
import Iot from "../models/iotModels.js";
import Murid from "../models/muridModels.js";
import Absen from "../models/absenModel.js";

const moduleController = asyncHandler(async (req, res) => {
    let response = {};
    const { key } = req.body;
    const kode_id = req.params.id;
    const module = await Iot.findOne({ kode_id });

    const currentTime = moment();
    const batasWaktu = moment().set({ hour: 6, minute: 30 });
    let keterangan = "";
    if (currentTime.isBefore(batasWaktu)) {
        keterangan = "Masuk";
    } else {
        keterangan = "Terlambat";
    }

    if (!module || module.mode == "absen") {
        const muridExist = await Murid.findOne({ RF_ID: key });
        
        if( muridExist.name ){

                const Absensi = await Absen.create({
                    kelas: muridExist.kelas,
                    nama: muridExist.nama,
                    keterangan: keterangan,
                tanggal: currentTime.format("YYYY-MM-DD"),
            });
            response = {
                message: "berhasil absen: " +muridExist.name ,
                data: Absensi,
            };
            
        }else {
            response = {
                message: "data belum lengkap",
            };

        }
    } else {
        const exist = await Murid.findOne({ RF_ID: key });
        if (!exist) {
            const result = await Murid.create({
                RF_ID: key,
                kelas: module.mode,
                nama: "",
                alamat: "",
                nis: "",
            });
            response = {
                message: "berhasil membuat",
                data: result,
            };
        } else {
            response = {
                message: "telah tersedia",
            };
        }
    }
    return res.status(200).json(response);
});


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

export { moduleController, getAbsensi, getAbsensiByKelas, updateDataMurid, getAbsensiByTanggal };
