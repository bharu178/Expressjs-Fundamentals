const express=require('express')
const {getUser,getUserById,createUser}=require('../controllers/UserController')
const router=express.Router()
router.get('/',getUser)
router.get('/:id',getUserById)
router.post('/',createUser)
module.exports=router;