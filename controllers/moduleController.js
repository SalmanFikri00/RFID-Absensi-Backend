import asyncHandler from "express-async-handler";
import moment from "moment";
import Iot from "../models/iotModels.js";
import Murid from "../models/muridModels.js";
import Absen from "../models/absenModel.js";

const moduleController = async (key , kode_id) => {

    const module = await Iot.findOne({ kode_id });
    let response
    console.log(key)

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
        
        console.log(muridExist)

        if( muridExist ){

            if( muridExist.nama ){

                
                const Absensi = await Absen.create({
                    kelas: muridExist.kelas,
                    nama: muridExist.nama,
                    keterangan: keterangan,
                    tanggal: currentTime.format("YYYY-MM-DD"),
                });
                response = {
                    action: "absen_berhasil",
                    data: muridExist.nama,
                };
            }else{
                response = {
                    action: "absen_gagal",
                    data: 'data kosong',
                };
            }
            
        }else {
            response = {
                action: "absen_gagal",
                data: "tidak terdaftar",
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
                action: "mode_daftar",
                data: "berhasil membuat",
            };
        } else {
            response = {
                action: "mode_daftar",
                data: "sudah tersedia",
            };
        }
    }
    return response;
}






export { moduleController }
