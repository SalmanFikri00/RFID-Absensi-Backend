import asyncHandler from 'express-async-handler'

import Iot from '../models/iotModels.js';

// Fungsi untuk menambahkan data ke model Iot
const setIotData = asyncHandler( async (req, res) => {
    const { kode_id, mode } = req.body;

    if (!kode_id || !mode) {
        return res.status(400).json({ message: 'Kode ID dan Mode diperlukan' });
    }

    const exists = await Iot.findOne({kode_id})
    
    if(!exists){
        const newIot = await Iot.create({ kode_id, mode });
        res.status(201).json({
            message : "berhasil di set",
            data: newIot
        });
    }

    exists.mode = mode

    exists.save()

    res.json({
        message: "berhasil di set"
    })
})



// Mengekspor controller
export { setIotData };
