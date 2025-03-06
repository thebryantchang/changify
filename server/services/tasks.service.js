//absolute imports

//relative imports
const { deleteTaskById } = require('../controllers/tasks.controller')
const {Category} = require('../models/category')
const {Tasks} = require('../models/tasks')

//functions
const tasksService = {
    createCategory:async(name)=>{
        try{
            const category = new Category({
                name
            })
    
            await category.save()
            return category
        }catch(err){
            throw(err)
        }
    },
    createTask:async(body)=>{
        try{
            const task = new Tasks({
                title: body.title,
                description: body.description,
                details: body.details,
                importance: body.importance,
                category: body.category,
                creator: body.creator,
                dueDate: body.dueDate,
                dayDue: body.dayDue,
                monthDue: body.monthDue,
                yearDue: body.yearDue
            })
            await task.save()
            return task
        }catch(err){
            throw(err)
        }
    },
    findTaskById:async(id)=>{
        try{
            const task = await Tasks.findById(id).populate('category').populate('creator')
            if(!task)throw new Error('task not found')
            return task
        }catch(err){
            throw(err)
        }
    },
    findTasksbyUserId:async(id)=>{
        try{
            const tasks = await Tasks.find({creator: id}).populate('category').populate('creator')

            return tasks
        }catch(err){
            throw(err)
        }
    },
    findTasksbyCategoryId:async(id)=>{
        try{
            const tasks = await Tasks.find({category: id}).populate('category').populate('creator')

            return tasks
        }catch(err){
            throw(err)
        }
    },
    findTasksbyImportance:async(importance)=>{
        try{
            const tasks = await Tasks.find({importance: importance}).populate('category').populate('creator')

            return tasks
        }catch(err){
            throw(err)
        }
    },
    findTasksbyDueDate:async(uid)=>{
        try{
            const tasks = await Tasks.find({ creator: uid }).sort({ dueDate: 1 });

            return tasks
        }catch(err){
            throw(err)
        }
    },
    deleteTaskById:async(tid)=>{
        try{
            const task = await Tasks.findByIdAndDelete(tid);

            return task
        }catch(error){
            throw(error)
        }
    }
}


//exports
module.exports = {tasksService}