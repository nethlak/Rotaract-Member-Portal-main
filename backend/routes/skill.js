const router = require('express').Router();
const {getSkills, createSkill, getSkillbyId, updateSkill, deleteSkill} = require('../controller/skillController')
const {protect} = require('../middleware/authMiddleware')
const {grantAccess} = require('../permission/permission')

router.route('/').get(protect, grantAccess("readAny","skill"), getSkills)
router.route('/create').post(protect, createSkill)
router.route('/:id').get(getSkillbyId).put(protect, updateSkill).delete(protect, deleteSkill)


module.exports = router