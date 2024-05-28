

const notFoundh = ( req , res , next ) => {
    const error = new Error( ` error : ${req.originalUrl}` );
    res.status(404)
    next( error );
} 

const errorHandler = ( err , req , res )=> {
    let statusCode = res.statusCode  == 200 ? 500 : res.statusCode
    let errMsg = err.message

    if( err.name == 'CastError' && errMsg.kind == 'ObjectId'){
        statusCode = 404
        massage = 'Resource not found'
    }

    
    res.status( statusCode).json({
        massage, 
        stack : procces.env.NODE_ENV == 'production' ? null : err.stack
    })
}

export { errorHandler , notFoundh} 