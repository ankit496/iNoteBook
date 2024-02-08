const bcrypt=require('bcryptjs')
module.exports={
    SALT:bcrypt.genSaltSync(10)
}