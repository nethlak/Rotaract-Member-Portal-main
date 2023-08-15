const router = require('express').Router()

const {getExcuses, createExcuse, updateExcuse, getExcuseById, deleteExcuse} = require('../controller/excuseController')
const {grantAccess} = require('../permission/permission')
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect, grantAccess('readAny', 'excuse'), getExcuses)
router.route('/create').post(protect, createExcuse)
router.route('/:id').get(protect,getExcuseById).put(protect, updateExcuse).delete(protect, deleteExcuse)

module.exports = router