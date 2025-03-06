//absolute imports
const express = require('express')
const router = express.Router()

//relative imports
const tasksController = require('../controllers/tasks.controller')
const {auth} = require('../middleware/auth')

router.post('/postcategory',auth('createAny','categories'),tasksController.addCategory)
router.post('/posttask',auth(),tasksController.addTask)
router.get('/gettaskbyid/:id',auth(),tasksController.getTaskById) //id tasknya
router.get('/gettasksbyuser/:id',auth(),tasksController.getTasksByUserId) //id usernya
router.get('/gettasksbycategory/:id',auth(),tasksController.getTasksByCategoryId) //id categorynya
router.get('/gettasksbyimportance/:importance',auth(),tasksController.getTasksByImportance)
router.get('/gettasksbyduedate/:uid',auth(),tasksController.getTasksByDueDate)
router.delete('/deletetaskbyid/:tid',tasksController.deleteTaskById)

module.exports = router