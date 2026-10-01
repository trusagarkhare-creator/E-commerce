const express=require('express')
const app=express()
const cookieParser=require('cookie-parser')
const product = require('./routes/productRouter')
const middleware=require('./middleware/error')
const user=require('./routes/userRoute')
const order = require("./routes/orderRoute")


// cookie_parser
app.use(cookieParser())

app.use(express.json())
app.use("/api/v1",product)
app.use("/api/v1",order)
app.use("/api/v1",user)



//middleware
 
app.use(middleware)




module.exports=app