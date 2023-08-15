const router = require('express').Router()
const {createProject, getProjectById, getProjects, updateProject, deleteProject} = require('../controller/projectController')
const {protect} = require('../middleware/authMiddleware')
const {grantAccess} = require('../permission/permission')

router.route('/').get(getProjects)
router.route('/create').post(protect, createProject)
router.route('/:id').get(getProjectById).put(protect, updateProject).delete(protect,deleteProject)

module.exports = router