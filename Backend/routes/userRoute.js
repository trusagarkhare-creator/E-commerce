const express=require('express')
const {registorUser, loginUser, loggedOutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateUserProfile, getUsers, getSingleUser, updateUserRole ,DeleteUser } = require('../controller/userController')
const router=express.Router()
const { AuthoriseUser,authorizeRole } = require("../middleware/auth");

router.route("/registor").post(registorUser)
// login user
router.route("/login").post(loginUser)
// User logged Out
router.route("/logout").post(loggedOutUser)

// forgot password
router.route("/forgot").post(forgotPassword)
// reset password
router.route("/password/reset/:token").put(resetPassword)
// user check your details
router.route("/me").get(AuthoriseUser,getUserDetails)
// update User Password
router.route("/password/update").put(AuthoriseUser,updateUserPassword)

// update user profile
router.route("/profile/update").put(AuthoriseUser,updateUserProfile)

// get users Detail --Admin
router.route("/admin/usersDetails").get(AuthoriseUser,authorizeRole("admin"),getUsers)

// get single user Details --Admin
router.route("/admin/user/:id").get(AuthoriseUser,authorizeRole("admin"),getSingleUser)
// user role update --admin
router.route("/admin/update/user/:id").put(AuthoriseUser,authorizeRole("admin"),updateUserRole)
// user deleted by admin
router.route("/admin/delete/user/:id").delete(AuthoriseUser,authorizeRole("admin"),DeleteUser)


module.exports=router