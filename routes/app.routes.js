import express from 'express'
import { setIotData } from '../controllers/iotController.js'
import { addKelasController, editKelasController, deleteKelasController } from '../controllers/kelasController.js'
const router = express.Router()

router.post('/iot/set' , setIotData )

router.post('/kelas/add' , addKelasController )

router.post('/kelas/edit' , editKelasController )

router.post('/kelas/delete' , deleteKelasController )

router.post('/kelas/get' ,  )

router.post('/kelas/all' ,  )

export default router
