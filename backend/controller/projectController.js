const Project = require('../model/project.model')
const asyncHandler = require('express-async-handler')
const {roles} = require('../roles')


// get all projects

const getProjects = asyncHandler(async (req,res) => {
    const projects = await Project.find()
  
    res.send(projects)
})

// create projects

const createProject = asyncHandler(async (req, res) => {
    const { avenueName, projectName, description, startDate, duration, task, projectStatus, projectMilestones} = req.body

    var permission = roles.can(req.member.userRole).createOwn("project")

    if(permission.granted) {
        if(!avenueName || !projectName || !startDate) {
            res.status(400)
            throw new Error("Please fill all the fields")
        } else{
            const project = new Project({
                member: req.member._id , 
                avenueName, 
                projectName, 
                description, 
                startDate, 
                duration, 
                task, 
                projectStatus, 
                projectMilestones,
            })
    
            const createdProject = await project.save()
            res.status(201).json(createdProject)
    
        }
    } else{
        res.status(403)
        throw new Error("You don't have permission!")
    }
       
})

// get project by Id

const getProjectById = asyncHandler(async (req,res) => {
    const project = await Project.findById(req.params.id) 
    
    if(project) {
        res.json(project)
    } else{
        res.status(404).json({message: "Project not found"})
    }
})

// update project

const updateProject = asyncHandler(async (req,res) => {

    const { avenueName, projectName, description, startDate, duration, task, projectStatus, projectMilestones} = req.body

    const project = await Project.findById(req.params.id)

    var permission = roles.can(req.member.userRole).updateAny("project")

    if(permission.granted === false) {
        if(project.member.toString() === req.member._id.toString()) {
            permission = roles.can(req.member.userRole).updateOwn("project")
        }
    }

    if(permission.granted) {
        if(project) {
            project.avenueName = avenueName
            project.projectName = projectName
            project.description = description
            project.startDate = startDate
            project.duration = duration
            project.task = task
            project.projectStatus = projectStatus
            project.projectMilestones = projectMilestones
    
            const updatedProject = await project.save()
            res.json(updatedProject)
        } else{
            res.status(404)
            throw new Error("Project Not found")
        }
    } else {
        res.status(403)
        throw new Error("You don't have permission!")
    }
    
})

// delete a project

const deleteProject = asyncHandler(async (req,res) => {
    const project = await Project.findById(req.params.id)

    var permission = roles.can(req.member.userRole).deleteAny("project")

    if(permission.granted === false) {
        if(project.member.toString() === req.member._id.toString()) {
            permission = roles.can(req.member.userRole).deleteOwn("project")
        }
    }

    if(permission.granted) {
        if(project) {
            await project.remove()
            res.json({message: "Project removed"})
        } else{
            res.status(404)
            throw new Error("Project not found")
        }
    } else {
        res.status(403)
        throw new Error("You don't have permission!")
    }

})

module.exports = {getProjects, createProject, getProjectById, updateProject, deleteProject}