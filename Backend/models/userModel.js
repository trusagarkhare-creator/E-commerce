const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
    maxLength: [30, "con not exceed more than 30 character"],
    minLength: [5, "Name should have more than 5 character "],
  },
  email: {
    type: String,
    required: [true, "Please Enter your email"],
    maxLength: [50, "con not exceed more than 50 character"],
    minLength: [13, " Email Should have more than 13 character "],
    validator: [validator.isEmail, "Please enter valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    minLength: [8, " Password should have more than 8 character "],
    select: false,
  },
  avatar: {
    product_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};
// for compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = async function () {
  // create reset token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // get hash reset password to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // get resetPassword expire
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
  return resetToken
};
module.exports = mongoose.model("user", userSchema);
