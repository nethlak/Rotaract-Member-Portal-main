const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const avenueSchema = new Schema({
    avenueName:{type:String,required:true},
    avenueId:{type:String, required:true},
    noOfMembers:{type:Number, required:true}
},{
    timestamps:true
});

const Avenue = mongoose.model('Avenue',avenueSchema);

module.exports = Avenue;