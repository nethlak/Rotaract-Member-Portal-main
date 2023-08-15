const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const badgeSchema = new Schema({
    pic:{
        type:String,
        required:true
    },
    RACUOK_ID:{
        type:String,
         required:true
    },
}, {
    timestamps:true
})

const Badge = mongoose.model('Badge', badgeSchema)
module.exports = Badge