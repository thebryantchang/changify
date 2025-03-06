//absolute exports
const express = require('express')

//relative exports

const router = express.Router()

//routes
const authRoute = require('./auth.route')
const userRoute = require('./user.route')
const tasksRoute = require('./tasks.route')

const routesIndex = [
    {
        path:'/auth',
        route:authRoute
    },
    {
        path:'/user',
        route:userRoute
    },
    {
        path:'/tasks',
        route:tasksRoute
    },
]

routesIndex.forEach(route=>{
    router.use(route.path,route.route)
})

module.exports = router