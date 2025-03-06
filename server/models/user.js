const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    subscription:{
        type:String,
        enum:["Free","Verified","Premium"],
        required:true,
        default:"Free"
    }
})

userSchema.methods.generateToken = function(){
    const user = this
    const userObj = {sub:user._id.toHexString(),email:user.email}
    const token = jwt.sign(userObj,process.env.DB_SECRET,{expiresIn:'1d'})
    return token
}

const User = mongoose.model("User", userSchema)
module.exports = {User}

