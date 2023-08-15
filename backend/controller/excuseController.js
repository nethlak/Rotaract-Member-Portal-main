const asyncHandler = require('express-async-handler')
const Excuse = require('../model/excuse.model')

// get excuses

const getExcuses = asyncHandler(async (req, res) => {
    
    const excuses = await Excuse.find()
    res.json(excuses)
})

// create excuse

const createExcuse = asyncHandler(async (req, res) => {

    const {RACUOK_ID,memberName,avenue,reason} = req.body

    if(!RACUOK_ID || !memberName || !avenue || !reason) {
        res.status(400)
        throw new Error("Please fill all the fields")

    } else {
        const excuse = new Excuse({
            member: req.member._id, RACUOK_ID,memberName,avenue,reason
        })

        const createdExcuse = await excuse.save()

        res.status(201).json(createdExcuse)
    }
})

// get excuse by ID

const getExcuseById = asyncHandler(async (req,res) => {
    const excuse = await Excuse.findById(req.params.id)

    if (excuse) {
        res.json(excuse)
    } else {
        res.status(404).json({message : "Excuse not found"})
    }
})

// update excuse

const updateExcuse = asyncHandler(async (req, res) => {

    const {RACUOK_ID,memberName,avenue,reason} = req.body

    const excuse = await Excuse.findById(req.params.id)

    // check whether excuse actully belog to the user

    if(excuse.member.toString() !== req.member._id.toString()) {
        throw new Error("You cannot perform this action")
    }

    if (excuse) {
        excuse.RACUOK_ID = RACUOK_ID
        excuse.memberName = memberName
        excuse.avenue = avenue
        excuse.reason = reason

        const updatedExcuse = await excuse.save()
        res.json(updatedExcuse)

    } else{
        res.status(404)
        throw new Error("Excuse not found")
    }


})

// delete excuse

const deleteExcuse = asyncHandler(async (req,res) => {
    const excuse = await Excuse.findById(req.params.id)

    if (excuse.member.toString() !== req.member._id.toString()) {
        res.status(401)
        throw new Error("You cannot perform this action")
    }

    if(excuse) {
        await excuse.remove()
        res.json({message: "Excuse removed"})
    } else {
        res.status(404)
        throw new Error("Excuse not found")
    }

})

module.exports = {getExcuses, createExcuse, updateExcuse, deleteExcuse, getExcuseById}