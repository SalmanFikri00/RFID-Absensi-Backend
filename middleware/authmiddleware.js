import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModels.js'


const protect = asyncHandler(async (req, res, next) => {


    let token = req.cookies.jwt
    
    if(token){
        try{
            const decoded = jwt.verify(token , process.env.jwt_secret)
            req.user = await User.findById(decoded.userId).select('-password')

            next()
        }catch(err){
            res.status(401).json({
                status : 'failed',
                massage : 'no authorized, invalid token',
            })
        }
    }else {
        res.status(401).json({
            status : 'failed',
            massage : 'no authorized, no token',
        })
    }

})

export { protect }