const Order = require("../models/orderModel")
const ErrorHandler = require('../utils/errorhendeler')
const catchAsyncError=require('../middleware/hendleasyncerror')
const Product=require('../models/productModel')



// create oder 

exports.createOrder = catchAsyncError(async(req,res,next)=>
{
    const { shippingInfo,orderItems,paymentInfo,itemsPrice,taxPrice,shippingPrice,totalPrice } = req.body;
  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt:Date.now(),
    user: req.user._id
});


res.status(201).json(
    {
        success:true,
        order
    }
)
})

// get single order 
exports.getOrder = catchAsyncError(async(req,res,next)=>
{
   
    const order = await Order.findById(req.params.id).populate("user",
       "name email")
    if(!order)
    {
        return next(new ErrorHandler(404,`Order not found with id:${req.params.id}`))

    }
    res.status(200).json(
        {
            success:true,
            order
        }
    )
})

// get my order
exports.getMyOrder = catchAsyncError(async(req,res,next)=>
{
     
    
    const order = await Order.find({user:req.user._id})
       if(!order)
    {
        return next(new ErrorHandler(404,`Order not found with id:${req.user._id}`))

    }
    res.status(200).json(
        {
            success:true,
            order
        }
    )
})

// get all order --Admin

exports.getAllOrder = catchAsyncError(async(req,res,next)=>
{
    const order = await Order.find()

    let totalAmount = 0;
    order.forEach((o) => {
        totalAmount+=o.totalPrice
        
    });

     res.status(200).json(
        {
            success:true,
            totalAmount,
            order
        }
    )
})

// update order --Admin

exports.updateOrder = catchAsyncError(async(req,res,next)=>
{
    const order = await Order.findById(req.params.id)

   if(order.orderStatus==="delivered")
   {
    return next(400,"you have already delivered this order")
   }

   order.orderItems.forEach(async(order)=>
{
    await updateStock(order.product,order.quantity)
})
    order.orderStatus=req.body.status
    if(req.body.status==="delivered")
    {
        order.deliveredAt=Date.now()
    }
await order.save({validateBeforeSave:false})

     res.status(200).json(
        {
            success:true,
            order
        }
    )


})


async function updateStock(id,quantity) {
    
    const product = await Product.findById(id)
if(!product)
{
    return next(new ErrorHandler(404,`product not found with id:${id}`))
}
    product.stock-=quantity

    await product.save({validateBeforeSave:false})


}