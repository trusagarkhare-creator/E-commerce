const mongoose=require('mongoose')

const productSchema= new mongoose.Schema(
    {
        name:
        {
            type:String,
            required:[true," please Enter product name"]
        },
        description:
        {
            type:String,
            required:[true," Please Enter product Description"]
        },
        price:
        {
            type:Number,
            required:[true,"Please Enter product Price"],
            maxLength:[8,"price can not exceed 8 character "]
        },
        ratings:
        {
            type:Number,
            default:0
        },
        image:
        [
            {
                product_id:
                {
                    type:String,
                    required:true
            },
            url:
            {
                 type:String,
                    required:true
            }
        }
        ],
        category:
        {
            type:String,
            required:[true,"Please Enter product category"]
        },
        stock:
        {
            type:Number,
            required:[true,"please Enter product Stock"],
            maxLength:[4,"Stock can not exceed 4 charater"],
            default:1
        },
        NumOfReviews:
        {
            type:Number,
            default:0
        },
        reviews:[

            {
                   user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
           required:true,
                   },
                name:{
                  type:String,
            required:true
                },
                rating:
                {
                type:Number,
                required:true
             
                },
                comment:
                {
                    type:String,
                    required:true
                }

            }

        ],
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"user",
           required:true

        },
        createdAt:
        {
            type:Date,
            default:Date.now
        }
       
    }
)

module.exports=mongoose.model("product",productSchema)