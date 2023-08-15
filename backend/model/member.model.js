const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const Schema = mongoose.Schema;

const memberSchema = new Schema({
    memberName:{
        type:String,  
        required:true
    },
    email:{
        type:String, 
        required:true,
        unique:true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
          ],
    },
    password:{
        type:String, 
        required:true,
        minlength:6
    },
    racId:{
        type:String,
         required:true
    },
    birthDate:{
        type:Date, 
        required:true
    },
    city:{
        type:String,
         required:true
    },
    avenue:{
        type:String,
        required:true
    },
    academicYear:{
        type:String,
        required:true
    },
    pic: {
        type: String,
        required: true,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
      userRole:{
          type:String,
          enum:['basic', 'director', 'saa','sec','pre','admin'],
          default:'basic'

      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,

},{
    timestamps:true
});

// encrypt member password

memberSchema.pre("save", async function (next) {
    if(!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

// dcrypt password

memberSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

// reset password

memberSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
    return resetToken;
  };

const Member = mongoose.model('Member',memberSchema);

module.exports = Member;
