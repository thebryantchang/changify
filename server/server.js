//absolute imports
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
const passport = require('passport')

//relative imports
const routes = require('./routes')
const {jwtStrategy} = require('./middleware/passport')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(mongoURI)

//middlewares
app.use(bodyParser.json())
app.use(passport.initialize())
passport.use('jwt',jwtStrategy)
app.use('/api',routes)

const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})