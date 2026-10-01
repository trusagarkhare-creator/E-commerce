 const ErrorHandler=require('../utils/errorhendeler')

 module.exports=(err,req,res,next)=>
 {
    
   if (err.name === "CastError") {
    err = new ErrorHandler(400, "Invalid Product ID");
}
    
    err.statuscode=err.statuscode||500
    err.message=err.message||"internal server error";



    // mongoose duplicate error
    if (err.code === 11000) {

        const field = Object.keys(err.keyValue)[0];

        err = new ErrorHandler(
            400,
            `${field} already exists`
        );
    }
    // wrong jwt token

 if(err.name === "JsonWebTokenError") {
        err = new ErrorHandler(
            401,
            "Invalid token"
        );
    }
    // jwt token expire
      if (err.name === "TokenExpiredError") {
        err = new ErrorHandler(
            401,
            "Token has expired"
        );
    }

    res.status(err.statuscode).json(
        {
            success:false,
            message:err.message
        }
    )
 }