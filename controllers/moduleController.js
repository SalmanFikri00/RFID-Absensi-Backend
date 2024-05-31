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

<<<<<<< HEAD
    const { key } = req.body
    let response = {}

    console.log(key)

    const kode_id = req.params.id

    console.log(kode_id)

    const module = await Iot.findOne({kode_id})

    if( !module || module.mode == 'absen' ){

        
        // fungsi absen bebas mau di apain

        console.log('nyari murid')
        const muridExist = await Murid.findOne({RF_ID : key})
        // console.log(muridExist)

        if(muridExist){

            res.json({
                message : 'success mass ',
                data : muridExist
            }).status(200)
        }else{
            res.status(400).json({
                message : 'wahh gagal mass',
                data : muridExist
            })
        }
            

        
        

    }else{
        
        const exist = await Murid.findOne({RF_ID : key})

        if( !exist ){

            const result = await Murid.create({
                RF_ID : key,
                kelas : module.mode,
                nama : '',
                alamat: '',
                nis : '',
            })

            console.log(result)
        
            res.json({
                message: 'succes'
            })

        }else{
            
        res.status(400).json({
            message: 'telah tersedia'
        })
            
        }
    }

    // res.json(response)
    // res.status(200).json(response)
=======
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
>>>>>>> e538e5a5e9d7723dfa0f8eb18fea9eedf8474bca

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
