const User = require('../models/User')
const bcrypt=require('bcryptjs')
const JWT=require('jsonwebtoken')
const secret="thisisasecret"
const createToken=(user)=>{
    const payload={
        id:user.id
    }
    const token=JWT.sign(payload,secret)
    return token
}
module.exports = {
    createToken
}