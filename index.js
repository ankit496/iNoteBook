const express=require('express')
const cors=require('cors')
const app=express()
const path=require("path")
const dotenv=require('dotenv')
dotenv.config()
const connectMongoose=require('./dbConnect.js')
const bodyParser=require('body-parser')
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(express.static(path.join(__dirname,"build")))

connectMongoose()
const port=process.env.PORT||5000

//available routes
const {notesRoute,authRoute}=require('./routes/index.js')
app.use('/api/auth',authRoute)
app.use('/api/notes',notesRoute)

app.listen(port,()=>{
    console.log('App started on port',port)
})
