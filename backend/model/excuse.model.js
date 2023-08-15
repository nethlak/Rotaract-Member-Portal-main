const mongoose = require('mongoose')

const excuseModel = mongoose.Schema({
    RACUOK_ID:{
        type:String,
        required:true
    },
    memberName:{
        type:String,  
        required:true
    },
    avenue:{
        type:String,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    member:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Member"
    },
},{
    timestamps:true
})

const Excuse = mongoose.model("Excuse", excuseModel)

module.exports = Excuse

