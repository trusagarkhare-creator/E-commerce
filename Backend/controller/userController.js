const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorhendeler");
const catchAsyncError = require("../middleware/hendleasyncerror");
const sendjwtToken = require("../utils/sendJwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register user
exports.registorUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      product_id: "this is a sample product",
      url: "sample//hello/user",
    },
  });

  sendjwtToken(user, 201, res);
});

// login user
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler(400, "Please Enter email and password"));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next(new ErrorHandler(401, "Invalid email or password"));
  }

  sendjwtToken(user, 200, res);
});
// logged out

exports.loggedOutUser = catchAsyncError(async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
  });
  res.status(401).json({
    success: true,
    message: "Logged Out",
  });
});

// get forget password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  // find user
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler(404, "User not found"));
  }
  // get resetPAssword token
  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // get resetPassword url
  const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

  const message = `Your reset password token is:-

${resetPasswordUrl}

If you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "this is E-commarce Forgot pasrrword Recovery",
      message,
    });

    res.status(200).json({
      succes: true,
      message: "Email send successfully",
    });
  } catch (error) {
    user.resetPasswordToken = undefined;

    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(500, `${error.message}`));
  }
});

// reset password
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating hash password
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(400, "Reset password token is Invalid or expired"),
    );
  }
  if (req.body.password !== req.body.comfirmPassword) {
    return next(
      new ErrorHandler(400, "Passwors and ComfirmPassword do not matche"),
    );
  }
  user.password = req.body.password;

  user.resetPasswordToken = undefined;

  user.resetPasswordExpire = undefined;
  await user.save();

  sendjwtToken(user, 200, res);
});

// get user details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});


// update User password
exports.updateUserPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");
  const isPasswordMatched= await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler(400, "Your old password is incorrect"));
  }

  if (req.body.newPassword !== req.body.comfirmPassword) {
    return next(
      new ErrorHandler(
        400,
        "Your new password and comfirmPassword is incorrect",
      ),
    );
  }
  user.password = req.body.newPassword;
  await user.save();
  sendjwtToken(user, 200, res);
});

// update user Profile

exports.updateUserProfile = catchAsyncError(async (req, res, next) => {
  
  const newUserData={
  name:req.body.name,
  email:req.body.email,
  }
 
  // we will add cloudinary letter

   const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
     runValidators: true
  });

res.status(200).json({
    success: true,
    
  });
});
// get all users --
exports.getUsers=catchAsyncError(async (req,res,next)=>
{
const users=await User.find()
res.status(200).json({
  success:true,
  users
})
})
// get single user Details --Admin
exports.getSingleUser=catchAsyncError(async(req,res,next)=>
{
const user=await User.findById(req.params.id)

if(!user)
{
  return next(new ErrorHandler(401,`User does not exist with Id: ${req.params.id}`))
}

res.status(200).json({
  success:true,
  user
})
})

// update user role --Admin

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  
  const newUserData={
  name:req.body.name,
  email:req.body.email,
  role:req.body.role
  }
 

   const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
       returnDocument: 'after',
     runValidators: true
  });
  if(!user)
{
  return next(new ErrorHandler(401,`User does not exist with Id: ${req.params.id}`))
}

res.status(200).json({
    success: true,
    user,
    
  });
});

// Delete user --Admin

exports.DeleteUser=catchAsyncError(async(req,res,next)=>
{
const user=await User.findByIdAndDelete(req.params.id)

if(!user)
{
  return next(new ErrorHandler(401,`User does not exist with Id: ${req.params.id}`))
}

res.status(200).json({
  success:true,
  message:`user deleted successfully with Id: ${req.params.id}`
})
})