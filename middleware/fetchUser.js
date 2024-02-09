const JWT=require('jsonwebtoken')
const secret=process.env.SECRET
const User=require('../models/User')
const fetchuser=async(req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(401).json({
            error:"Please authenticate using a valid token"
        })
    }
    try{
        const data=JWT.verify(token,secret)
        req.id=data.id
        req.email=data.email
        next()
    }
    catch(error){
        res.status(401).json({
            error:"Please authenticate using a valid token"
        })
    }
}
module.exports=fetchuser