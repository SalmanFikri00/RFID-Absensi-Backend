import express from 'express'
import { moduleController } from '../controllers/moduleController.js'
const router = express.Router()

router.post('/:id' , moduleController )


export default router
