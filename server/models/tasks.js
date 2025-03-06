const mongoose = require('mongoose');
const { number } = require('yup');
const Schema = mongoose.Schema;
require('dotenv').config();

const tasksSchema = mongoose.Schema({
    title:{
        type:String,
        maxLength:30,
        required:[true,'You need a title'],
    },
    description:{
        type:String,
        maxLength:60,
        required:[true,'You need a description']
    },
    details:{
        type:String,
        maxLength:200,
        required:[true,'You need a details']
    },
    importance:{
        type:String,
        enum:["Low","Medium","High","Urgent","Emergency"],
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:['incomplete','complete'],
        default:'incomplete',
        index:true
    },
    category:{
        type:String,
        required:true, //gantibackendnya nti
        enum:['School', 'Work', 'Private', 'Miscellaneous','Others'],
        index:true
    },
    date:{
        type:Date,
        default: Date.now
    },
    creator:{
        type:Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    dueDate: {
        type: Date,
        required: [true, 'You need a due date'],
        index: true // Adding index for better sorting performance
    },
    dayDue: {
        type: Number
    },
    monthDue: {
        type: Number
    },
    yearDue: {
        type: Number
    }
})

const Tasks = mongoose.model('Tasks',tasksSchema)
module.exports = {Tasks}