const jwt=require('jsonwebtoken')
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhendeler");
const catchAsyncError = require("../middleware/hendleasyncerror");
exports.AuthoriseUser=catchAsyncError(async (req,res,next)=>{

    const {token} = req.cookies
   
    
    if(!token)
    {
        return next(new ErrorHandler(401,"Please Login to access this resource ") )
    }
    const decodeData= jwt.verify(token,process.env.JWT_SECRET)

     req.user= await User.findById(decodeData.id)
     if(!req.user)
     {
       return next(new ErrorHandler(401,"User no longer exist ") ) 
     }
    next()
})

// Access Admin not a user
exports.authorizeRole = (...roles) =>
{
    return (req,res,next)=>
    {
        
        if(!roles.includes(req.user.role))
        {
            return next(new ErrorHandler(403,"User can not access this resource"))
        }
        next()
    }
}
    

    
