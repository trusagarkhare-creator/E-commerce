const express = require('express')

const router= express.Router()
const { AuthoriseUser,authorizeRole } = require("../middleware/auth");
const { createOrder, getOrder,getAllOrder, updateOrder, getMyOrder } = require('../controller/orderController');

// create order
router.route("/order/new").post(AuthoriseUser,createOrder)

// get order 
router.route("/order/:id").get( AuthoriseUser,getOrder)
// logged in user order/my order
router.route("/orders/me").get( AuthoriseUser,getMyOrder)

// get all order
router.route("/orders").get( AuthoriseUser,authorizeRole("admin"),getAllOrder)
// update order status
router.route("/order/update/:id").put( AuthoriseUser,authorizeRole("admin"),updateOrder)

// get my order







module.exports = router