import asyncHandler from 'express-async-handler'
import Iot from '../models/iotModels.js'
import Murid from '../models/muridModels.js'

const moduleController = asyncHandler( async ( req, res ) => {

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

})

export { moduleController }