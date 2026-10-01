const path = require("path");
const dotenv=require('dotenv')
const connectDB=require('./config/database')
// dotenv.config({path:"./config/config.env"})


// uncough Exception hendle

process.on("uncaughtException",(err)=>
{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to uncaught Exception");
    process.exit(1);
})
dotenv.config({
    path: path.join(__dirname, "config", "config.env"),
});
connectDB()

const app=require('./app')




const server=app.listen(process.env.PORT,()=>
{
    console.log(`sever is running :http://localhost:${process.env.PORT}`)
})

process.on("unhandledRejection",(err)=>
{
    console.log(`Error: ${err.message}`);
    console.log("Shutting down the server due to unhandledRejection Exception");
    server.close(()=>
    {
         process.exit(1);
    })
})