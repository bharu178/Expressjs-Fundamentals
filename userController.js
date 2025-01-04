const {User}=require('../config/myDataBase')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
const {check,validationResult}=require('express-validator')
dotenv.config()
exports.signUp=async (req,res)=>{
    try{
        const {username,password}=req.body
        if(!username || !password){
            return res.status(400).json({message:"Please check the inputs"})
        }
        const existingUser=await User.findOne({username})
        if(existingUser){
            return res.status(409).json({message:"User already existed"})
        }
        const salGen=10;
        const hashPassword=await bcrypt.hash(password,salGen)
        const newUser=new User({
            username,
            password:hashPassword
        })
        await newUser.save()
        return res.status(201).json({message:"User Created Successfully",newUser})
    }
    catch(error){
        console.error("Error creating user:", error); // Log the actual error
        return res.status(500).json({ message: "An error occurred while creating the user." });
    }
}
exports.login=async (req,res)=>{
    try{
        const {username,password}=req.body
        if(!username||!password){
            return res.json({message:"Please check the inputs"})
        }
        const user=await User.findOne({username})
        if(!user){
            return res.status(409).json({message:"User not found"})
        }
        const passwordMatch=await bcrypt.compare(password,user.password)
        if(!passwordMatch){
            return res.json({message:"Invalid userid or password"})
        }
        const mySecretKey=process.env.SECRET_KEY
        if (!mySecretKey) {
            return res.status(500).json({ message: "Server configuration error: Missing secret key" });
        }
        //Generate JWT Token
        const sessionId=crypto.randomUUID()
        const token=jwt.sign(
            {userId:user._id,username:user.username,sessionId},
            process.env.SECRET_KEY,
            {expiresIn:"15m"}
        )
        const REFRESH_TOKEN=jwt.sign(
            {userId:user._id,username:user.username,sessionId},
            process.env.REFRESH_SECRET_KEY,
            {expiresIn:'7d'}
        )
        user.sessionId=null;
        await user.save();
        return res.status(200).json({message:"Login successful",data:user,token,REFRESH_TOKEN})
    }
    catch(error){
        return res.status(500).json({message:`error during login:${error.message}`})
        console.error(error)
    }
}
exports.logout=async(req,res)=>{
    try{
        const userId=req.params.id
        if(!userId){
            return res.status(400).json({message:"Invalid user id"})
        }
        const user=await User.findById(userId)
        if(!user){
            return res.status(404).json({message:"User Not Found"})
        }
        user.sessionId=null
        await user.save()
        return res.status(200).json({message:"Logout successful"})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({message:"error during logout"})
    }
}
exports.getAllUsers = async(req,res)=>{
    try{
        const users=await User.find({},{password:0})
        return res.status(200).json({users})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({message:"Error durint fetching the users data"})
    }
}
exports.get=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id,{password:0})
        if(!user){
            return res.status(404).json({message:`${req.params.id} user is not found`})
        }
        return res.status(200).json({user})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({message:`Error during fetching the ${req.params.id} daata`})
    }
}
exports.updateUser=async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({message:"User is not found"})
        }
        if(req.body.username){
            user.username=req.body.username
        }
        if(req.body.password){
            const salGen=10;
            const hashPassword=await bcrypt.hash(req.body.password,salGen)
            user.password=hashPassword
        }
        const updateUser=await user.save()
        return res.status(200).json({updateUser})

    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({message: `Error during updating the ${req.params.id} data`})
    }
}
exports.deleteUser=async(req,res)=>{
    try{
        const delUser=await User.findByIdAndDelete(req.params.id)
        if(!delUser){
            return res.status(404).json({message:`${req.params.id} user is not found`})
        }
        return res.status(200).json({message:"User Deleted Successfully"})
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json({message:`Error during deleting the ${req.params.id} data`})
    }
}
exports.validateSignup=[
    check('username')
    .trim()
    .notEmpty()
    .withMessage('User name is Required')
    .isLength({min:3})
    .withMessage('Username must be atleast 3 characters long'),
    check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is Required')
    .isLength({min:6})
    .withMessage('Password must be atleast 3 characters long'),

]
exports.validateLogin=[
    check('username')
    .trim()
    .notEmpty()
    .withMessage('User name is Required'),
    check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is Required'),
]
exports.handleValidationErrors=(req,res,next)=>{
    const errors=validationResult(req)
    try{
        if(!errors.isEmpty()){
            return res.status(404).json({message:'Validation is not passed'})
        }
        next()
    }
    catch(error){
        console.log(error)
        res.status(400).json('error occuring')
    }
}