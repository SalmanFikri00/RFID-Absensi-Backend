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
        const Absensi = await Absen.create({
            nama: muridExist.nama,
            kelas: muridExist.kelas,
            keterangan: keterangan,
            tanggal: currentTime.format("YYYY-MM-DD")
        });
        response = {
            message: "succes",
            data: Absensi,
        };
        
    } else {
        const exist = await Murid.findOne({ RF_ID: key });
        if (!exist) {
            const result = await Murid.create({
                RF_ID: key,
                kelas: module.mode,
                nama: "haloo",
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
    res.status(200).json(response);
});

export { moduleController };
