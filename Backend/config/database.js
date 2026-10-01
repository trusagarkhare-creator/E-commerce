const mongoose=require('mongoose')

const connectDB=()=>
{
    mongoose.connect(process.env.DB_URL,).then((data)=>
    {
        console.log(`Database is connected:${data.connection.host}`)
    })
}
module.exports=connectDB