import express from 'express'
import { authUser , register , updateUserProfile , getUserProfile , logout  } from '../controllers/usercontrollers.js'
import { protect } from '../middleware/authmiddleware.js'
const router = express.Router()

router.post('/auth' , authUser)

router.post('/register' , register)

router.post('/logout' , logout)

router.route('/profile').get( protect , getUserProfile).post(protect , updateUserProfile)



export default router
