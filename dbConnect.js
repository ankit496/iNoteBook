const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const mongoUrl = process.env.MONGO_URL
const connectMongoose=()=>{
    mongoose.connect(mongoUrl)
    const db = mongoose.connection
    db.on("error", console.error.bind(console, "connection error"))
    db.once("open", () => {
        console.log('Database connected')
    })
}
module.exports=connectMongoose