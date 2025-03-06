//absolute imports
const express = require('express')
const router = express.Router()

//relative imports
const userController = require('../controllers/user.controller')
const {auth} = require('../middleware/auth')

//routes
router.route('/profile')
.get(auth('readOwn','profile'), userController.profile)
.patch(auth('updateOwn','profile'), userController.updateProfile)

//exports
module.exports = router