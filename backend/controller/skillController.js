const Skill = require('../model/skills.model')
const asyncHandler = require('express-async-handler')

// get skills

const getSkills = asyncHandler(async (req,res) => {
    const skills = await Skill.find({member: req.member._id})
    res.json(skills)
})

// create new skill

const createSkill = asyncHandler(async (req,res) => {
    const {skill} = req.body

    if(!skill) {
        res.status(400)
        throw new Error("Please fill all the fields")
    } else {
        const skills = new Skill({
            member: req.member._id, skill
        })

        const createdSkill = await skills.save()
        res.status(201).json(createdSkill)
    }
  
})

// get skills by id

const getSkillbyId = asyncHandler(async (req,res) => {
    const skill = await Skill.findById(req.params.id)

    if(skill) {
        res.json(skill)
    } else{
        res.status(404).json({message:"Skill not found"})
    }
})

// update skill

const updateSkill = asyncHandler(async (req,res) => {
    const skill = await Skill.findById(req.params.id)

    if(skill.member.toString() !== req.member._id.toString()) {
        throw new Error("You cannot perform this action")
    } 
    
    if(skill) {
        skill.skill = skill
        const updatedSkill = await skill.save()
        res.json(updatedSkill)
    }

    else{
        res.status(404)
        throw new Error("Skill not found")
    }
})

// delete skill

const deleteSkill = asyncHandler(async (req,res) => {
    const skill = await Skill.findById(req.params.id)

    if(skill.member.toString() !== req.member._id.toString()) {
        throw new Error("You cannot perform this action")
    } 

    if(skill) {
        await skill.remove()
        res.json("Skill removed")
    } else{
        res.status(404)
        throw new Error("Skill not found")
    }
})


module.exports = {getSkills, createSkill, getSkillbyId, updateSkill, deleteSkill}
