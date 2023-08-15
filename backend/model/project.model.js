const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    role:[String],
    RACUOK_ID:[String],
    points:[Number],
   
})

const projectSchema = new Schema({
    avenueName:{
        type:String,
        required:true
    },
    projectName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    startDate:{
        type:Date, 
        required:true
    },
    duration:{
        type:String,
         required:true
    },
    task:{
        type:taskSchema,
        required:true
    },
    projectStatus:{
        type:Boolean,
         required:true,
         default:false
    },
    projectMilestones:[String],
    member:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Member"
    },
},{
    timestamps:true
});

const Project = mongoose.model('Project',projectSchema);

module.exports = Project;