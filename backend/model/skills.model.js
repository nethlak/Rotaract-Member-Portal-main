const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const skillSchema = new Schema({
    skill:[String],
    member:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Member"
    },

},
{
    timestamps:true
})

const Skill = mongoose.model('Skill', skillSchema)

module.exports = Skill;

