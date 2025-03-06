//absolute imports
const express = require('express')
const router = express.Router()

//relative imports
const authController = require('../controllers/auth.controller')
const {auth} = require('../middleware/auth')

//routes
router.post('/register',authController.register)
router.post('/signin',authController.signIn)
router.get('/isauth',auth(),authController.isAuth)

//exports
module.exports = router