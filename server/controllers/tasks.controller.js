const {tasksService} = require('../services/tasks.service')

const tasksController = {
    async addCategory(req,res,next){
        try{
            const {name} = req.body
            const category = await tasksService.createCategory(name)
    
            res.json(category)

        }catch(err){
            res.status(400).send(err)
        }
        
    },
    async addTask(req,res,next){
        try{
            const task = await tasksService.createTask(req.body)
            res.json(task)
        }catch(err){
            res.status(400).json({
                status:"Failed",
                message:err.message
            })
        }
    },
    async getTaskById(req,res,next){
        try{
            const _id = req.params.id
            const task = await tasksService.findTaskById(_id)


            res.json(task)
        }catch(err){
            res.status(400).json({
                status:"Failed",
                message:err.message
            })
        }
    },
    async getTasksByUserId(req,res,next){
        try{
            const _id = req.params.id
            const tasks = await tasksService.findTasksbyUserId(_id)

            res.json(tasks)
        }catch(err){
            res.status(400).json({
                status:"Failed",
                message:err.message
            })
        }
    },
    async getTasksByCategoryId(req,res,next){
        try{
            const _id = req.params.id
            const tasks = await tasksService.findTasksbyCategoryId(_id)

            res.json(tasks)
        }catch(err){
            res.status(400).json({
                status:"Failed",
                message:err.message
            })
        }
    },
    async getTasksByImportance(req,res,next){
        try{
            const importance = req.params.importance
            const tasks = await tasksService.findTasksbyImportance(importance)

            res.json(tasks)
        }catch(err){
            res.status(400).json({
                status:"Failed",
                message:err.message
            })
        }
    },
    async getTasksByDueDate(req,res,next){
        try{
            const uid = req.params.uid;
            const tasks = await tasksService.findTasksbyDueDate(uid)

            res.json(tasks)
        }catch(err){
            res.status(400).json({
                status:"Failed",
                message:err.message
            })
        }
    },
    async deleteTaskById(req,res,next){
        try{
            const tid = req.params.tid
            const task = await tasksService.deleteTaskById(tid)

            res.json(task)
        }catch(error){
            res.status(400).json({
                status:"Failed",
                message:err.message
            })
        }
    }
}

module.exports = tasksController