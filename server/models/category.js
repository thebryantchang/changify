const mongoose = require('mongoose')

const categoriesSchema = mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim: true,
        maxLength: 20,
        required:[true,'You need a category name']
    },
    date:{
        type:Date,
        default:Date.now
    }
})

const Category = mongoose.model('Category',categoriesSchema);
module.exports = {Category}