const { Error } = require('mongoose')
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { name, password, email } = req.body
        await User.create({
            name: name,
            password: password,
            email: email
        })
        const token=await User.matchPassword(email,password)
        return res.status(201).json({
            data:token,
            message: 'Successfully created the User',
            err: {},
            success: true
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Email already exist",
            success:false
        })
    }
}
const verify=async (req,res)=>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try{
        const {email,password}=req.body
        try{
            const token=await User.matchPassword(email,password)
            res.cookie('token',token)
            res.status(201).json({
                data:token,
                message:'Succesfully logged in',
                success:true
            })
        }
        catch(error){
            res.status(400).json({
                message:'Enter correct credentials',
                success:false
            })
        }
    }
    catch(error){
        res.status(500).json({
            message:'Some error occured',
            success:false
        })
    }
}
const getUser=async(req,res)=>{
    try{
        const userId=req.id
        const user=await User.findById(userId).select("-password")
        res.status(200).send({
            user
        })
    }catch(error){
        res.status(500).send("Internal server Error")
    }
}
module.exports = {
    create,
    verify,
    getUser 
}