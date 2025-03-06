//absolute imports

//relative imports
const {User} = require('../models/user')

//functions
const userService = {
    findUserById:async(_id)=>{
        return await User.findById(_id)
    },
    updateProfile:async(req)=>{
        try{
            const tester = await User.findById(req.user._id)
            if(tester.username==req.body.username){
                throw new Error("No user datas were changed!")
            }
            const user = await User.findOneAndUpdate(
                {_id: req.user._id},
                {
                    "$set":{
                        username:req.body.username
                    }
                },
                {new:true}
            )
            if(!user){
                throw new Error("User not found")
            }
            return user
            
        }catch(err){
            throw(err)
        }
        
    }
}


//exports
module.exports = {userService}