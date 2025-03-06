//absolute imports

//relative imports
const {User} = require('../models/user')

//functions
const authService = {
    createUser:async(email,username,password,subscription)=>{
        try{
            const user = new User({
                email,
                username,
                password,
                subscription
            })
    
            await user.save()
            return user
        }catch(err){
            throw(err)
        }
    },
    signInUser:async(username,password)=>{
        try{
            const user = await User.findOne({username:username})
            if(!user){
                throw new Error("No such username exists!")
            }
            if(password!==user.password){
                throw new Error("Wrong Password!")
            }
            return user
        }catch(err){
            throw(err)
        }
    },
    genToken:(user)=>{
        const token = user.generateToken()
        return token
    }
}


//exports
module.exports = {authService}