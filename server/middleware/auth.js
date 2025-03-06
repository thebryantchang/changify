const passport = require('passport')
const {subscriptions} = require('../config/subscription')

const verify = (req,res,resolve,reject,rights) => (err,user) =>{
    if(err || !user){
        return reject(new Error('Sorry, unauthorized'))
    }
    req.user = {
        _id: user._id,
        email: user.email,
        username: user.username,
        subscription: user.subscription
    }

    if(rights.length){
        const action = rights[0]
        const resource = rights[1]
        const permission = subscriptions.can(req.user.subscription)[action](resource)
        if(!permission.granted){
            return reject(new Error("Sorry, you don't have the rights"))
        }
        res.locals.permission = permission
    }
    resolve()
}

const auth = (...rights) => async(req,res,next)=>{
    return new Promise((resolve,reject)=>{
        passport.authenticate('jwt',{session:false},verify(req,res,resolve,reject,rights))(req,res,next)
    })
    .then(()=>next())
    .catch(err=>res.status(400).json({
        status:"Failed",
        message:err.message
    }))
}

module.exports = {auth}