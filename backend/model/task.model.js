const mongoose = require('mongoose')
const Project = require('./project.model')
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    role:{
        type:String,
        required:true
    },
    RACUOK_ID:{type:String,
         required:true
    },
    points:{type:Number, 
        required:true
    },
    
})

const Task = mongoose.model('Task', taskSchema)
module.exports = Task