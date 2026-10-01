const Product=require('../models/productModel')
const ErrorHandler = require('../utils/errorhendeler')
const catchAsyncError=require('../middleware/hendleasyncerror')
const apiFeature = require('../utils/apifeatures')


//create product --Admin
exports.createProduct=catchAsyncError(
    async(req,res,next)=>
{
    req.body.user=req.user.id
    
    const product=await Product.create(req.body)

    res.status(201).json(
        {
            success:true,
            product
        }
    )
}

)


//get All product


exports.getAllProducts=catchAsyncError(
    async(req,res,next)=>
{
    let resultPerPage=5
    const countProduct= await Product.countDocuments();
    const apifeature=new apiFeature(Product.find(),req.query)
    apifeature
    .search()
    .filter()
    .pagination(resultPerPage)
    
    const product= await apifeature.query;

   
res.status(200).json(
    {
       success:true,
       product,
       countProduct
    }
)
}
)
//get product details

exports.getProductDetail= catchAsyncError(async (req,res,next)=>
{
 const product =await Product.findById(req.params.id)

 if(!product)
{
    return res.status(404).json(
        {
            success:false,
            message:"product not found"
        })
    }
    res.status(200).json(
        {
            success:true,
            product
           
        })
})





// Update product -- Admin
exports.updateProduct=catchAsyncError(async(req,res,next)=>
{
    
let product =await Product.findById(req.params.id)

if(!product)
{
    return res.status(404).json(
        {
            success:false,
            message:"product not found"
        })
    }
        product=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})

res.status(200).json(
        {
            success:true,
            product
           
        })
   
})
//delete product--Admin
exports.deleteProduct= catchAsyncError(async(req,res,next)=>
{
    let product =await Product.findById(req.params.id)
    
    if(!product)
{
 return next(new ErrorHandler(404,"product not found"))
    }
   await Product.findByIdAndDelete(req.params.id)
    res.status(200).json(
        {
            success:true,
           message:"product delete successfully"
           
        })

})



// review from user
exports.productReviews=catchAsyncError(async(req,res,next)=>
{
    const {productId,comment,rating} = req.body
  
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment

    }
    

    const product = await Product.findById(productId)

    if (!product) {
    return next(new ErrorHandler(404,"Product not found"));
}

    const isReviewed=product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString())
    if(isReviewed)
    {
product.reviews.forEach((rev)=>
{
   if(rev.user.toString()===req.user._id.toString()) 
   {
rev.rating = Number(rating);
rev.comment=comment
   }
})
    }
    else
{
product.reviews.push(review)

}
// update review number
product.NumOfReviews=product.reviews.length

let avg=0;
product.ratings=product.reviews.forEach((rev)=>{
    
    avg+=rev.rating

    
})
product.ratings=avg/product.reviews.length

await product.save({validationBeforeSave:false})

res.status(200).json(
    {
        success:true,
    }
)
})


// get review of a product 

exports.reviewProduct=catchAsyncError(async(req,res,next)=>
{
    const product = await Product.findById(req.query.productId)
        if (!product) {
    return next(new ErrorHandler(400,"Product not found"));
}

res.status(200).json(
    {
        success:true,
        reviews:product.reviews
    }
)
}
)

// delete reviews
exports.deleteReviews=catchAsyncError(async(req,res,next)=>
{
     
    const product = await Product.findById(req.query.productId)
    console.log(product)
        if (!product) {
    return next(new ErrorHandler(400,"Product not found"));
        }
        const reviews=product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString())

        let avg=0;
reviews.forEach((rev)=>{
    
    avg+=rev.rating

    
})
const ratings = reviews.length > 0
    ? avg / reviews.length
    : 0;
const NumOfReviews = reviews.length

await Product.findByIdAndUpdate(req.query.productId,{
    reviews,
    ratings,
    NumOfReviews
},{
    new:true,
    runValidators:true,
    findAndModify:false
})
        res.status(200).json(
    {
        success:true,
    }
)
})



