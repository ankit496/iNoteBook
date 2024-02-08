const mongoose=require('mongoose')
const bcrypt=require('bcryptjs')
const {SALT}=require('../config/serverConfig')
const {createToken}=require('../repository/userRepository')
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{
        type:String
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
})
userSchema.pre('save',function(next){
    const user=this
    if(!user.isModified("password"))
        return;
    const hashedPassword=bcrypt.hashSync(user.password,SALT)
    user.salt=SALT
    user.password=hashedPassword
    next()
})
userSchema.static('matchPassword',async function(email,password){
    const curr_user=await this.findOne({email:email})
    if(!curr_user)
        throw new Error('User not found')
    const userPassword=bcrypt.hashSync(password,curr_user.salt)
    const hashedPassword=curr_user.password
    if(hashedPassword!==userPassword)
        throw new Error('Incorrect Password')
    const token=createToken(curr_user)
    return token
})
const User=mongoose.model('User',userSchema)
module.exports=User