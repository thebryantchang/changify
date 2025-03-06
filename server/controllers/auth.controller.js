const {authService} = require('../services/auth.service')

const authController = {
    async register(req,res,next){
        try{
            const{email,username,password,subscription} = req.body
            const user = await authService.createUser(email,username,password,subscription)
    
            res.send(user)

        }catch(err){
            res.status(400).send(err)
        }
        
    },
    async signIn(req,res,next){
        try{
            const {username,password} = req.body
            const user = await authService.signInUser(username,password)
            const token = await authService.genToken(user)

            res.cookie('x-access-token',token).send({user,token})
        }catch(err){
            res.status(400).json({
                status:"Failed",
                message:err.message
            })
        }
    },
    async isAuth(req,res,next){
        try{
            res.json(req.user)
        }catch(err){
            res.status(400).json({
                status:"Failed",
                message:err.message
            })
        }
    }
}

module.exports = authController