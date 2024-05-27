import asyncHandler from 'express-async-handler'
import Iot from '../models/iotModels.js'
import Murid from '../models/muridModels.js'

const moduleController = asyncHandler( async ( req, res ) => {

    const { key } = req.body

    const kode_id = req.params.id

    console.log(kode_id)

    const module = await Iot.findOne({kode_id})

    if( !module || module.mode == 'absen' ){

        
        // fungsi absen bebas mau di apain

        // Murid.findOne({RF_ID : key})





        
        
        
        
    }else{
        
        const exist = await Murid.findOne({RF_ID : key})

        if( !exist ){

            
            const result = await Murid.create({
                RF_ID : key,
                kelas : module.mode,
                nama : '',
                alamat: '',
                nis : ''  
            })

            console.log(result)
        
            res.json({
                message: 'kartu berhasil ter registrasi di kelas'+ module.mode
            })
        }

    res.json({
        message: 'kartu telah di buat'
    })

    }

})

export { moduleController }