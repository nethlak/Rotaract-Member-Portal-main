const mongoose = require('mongoose')

const meetingSchema = mongoose.Schema({
    meetingLink:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    isFinished:{
        type:Boolean,
        required:true,
        default:false,
    },
    avenueName:{
        type:String,
    },
    virtualBg:{
        type:String,
        
    },
    member:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Member"
    },
}, {
    timestamps:true
})

const Meeting = mongoose.model('Meeting', meetingSchema)

module.exports = Meeting