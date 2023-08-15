const asyncHandler = require('express-async-handler')
const Member = require('../model/member.model')
const generateToken = require('../utils/generateToken')
const crypto = require('crypto')
const sendEmail = require('../utils/sendEmail')

// get all members

const getAllMembers = asyncHandler(async (req, res) => {
    const members = await Member.find()
    res.json(members)
})

// get member by Id

const getMemberById = asyncHandler(async (req, res) => {
    const member = await Member.findById(req.params.id)

    if(member) {
        res.json(member)
    } else {
        res.status(404).json({message:"Member not found"})
    }
})

// register user

const registerMember = asyncHandler(async (req, res) => {
    const {memberName, email, password, racId, birthDate, city, avenue, academicYear, pic, userRole} = req.body

    const memberExists = await Member.findOne({email})

    if(memberExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    // create new Member
    const member = await Member.create({
        memberName, email, password, racId, birthDate, city, avenue, academicYear, pic, userRole
    });

    if (member) {

        res.status(201).json({
            _id:member._id,
            memberName:member.memberName,
            email:member.email,
            racId:member.RACUOK_ID,
            userRole:member.userRole,
            token:generateToken(member._id)
        })
        console.log("Member added!");
    }
    else {
        res.status(400)
        throw new Error("Error Occured")
    }

})

// login user
const authMember = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    const member = await Member.findOne({email});

    if(member && (await member.matchPassword(password))) {
        res.json({
            _id:member._id,
            name:member.memberName,
            email:member.email,
            userRole:member.userRole,
            token:generateToken(member._id),

        })
        console.log("Successfully logged in!");
    } else {
        res.status(400)
        throw new Error("Invalid Email or password!");
    }

   
})

// forget password

const forgotPassword = asyncHandler(async (req, res) => {
    const {email} = req.body

    try {
        const member = await Member.findOne({email})

        if (!member) {
            res.status(404)
            throw new Error("No email could not be sent")
        }

        const resetToken = member.getResetPasswordToken()

        await member.save()

        const resetUrl = `http://localhost:3000/reset/${resetToken}`

        // HTML Message

        const message = `
        <h1>You have requested a password reset</h1>
        <p>Please make a put request to the following link:</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
        `

        try {
            await sendEmail({
                to: member.email,
                subject: "Password Reset Request",
                text: message
            })

            res.status(200).json({success: true, data: "Email sent"})

        } catch (error) {
            console.log(error)

            member.resetPasswordToken = undefined
            member.resetPasswordExpire = undefined

            await member.save()

            res.status(500)
            throw new Error("Email could not be sent")

        }
    } catch (error) {
        console.error(error)
    }
})

// reset password

const resetPassword = asyncHandler(async (req, res) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex")

    try {
        const member = await Member.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt: Date.now()}
        })

        if (!member) {
            res.status(400)
            throw new Error("Invalid token")
        }

        member.password = req.body.password
        member.resetPasswordToken = undefined
        member.resetPasswordExpire = undefined

        await member.save()

        res.status(201).json({
            success:true,
            data:"Password update successfully"
        })
    } catch (error) {
        console.error(error)
    }

})

module.exports = {registerMember, authMember, getAllMembers, getMemberById, forgotPassword, resetPassword}