const router = require('express').Router()
const { registerMember, authMember, getAllMembers, getMemberById, forgotPassword, resetPassword } = require('../controller/memberController')

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect, getAllMembers)
router.route('/').post(registerMember)
router.route('/login').post(authMember)
router.route('/:id').get(getMemberById)
router.route('/forgetpassword').post(forgotPassword)
router.route("/passwordreset/:resetToken").put(resetPassword)

module.exports = router