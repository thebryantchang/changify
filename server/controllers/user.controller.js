const {userService} = require('../services/user.service')

const userController = {
    async profile(req,res,next){
        try{
            const user = await userService.findUserById(req.user._id)
            if(!user){
                throw new Error("User not found")
            }
            res.json(res.locals.permission.filter(user._doc))
        }catch(err){
            res.status(400).json({
                status:"Failed",
                message:err.message
            })
        }
    },
    async updateProfile(req,res,next){
        try{
            const user = await userService.updateProfile(req)
            res.json(res.locals.permission.filter(user._doc))
        }catch(err){
            res.status(400).json({
                status:"Failed",
                message:err.message
            })
        }
    }
}

module.exports = userController