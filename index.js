const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
// const {User}=require('./config/myDataBase')
const userRouter=require('./routes/UserRoute')
const app=express()
app.use(express.json())
app.use('/api/user',userRouter)
app.use(express.json())
dotenv.config()
mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://bhargavi:Bhargavi@cluster0.cyjss.mongodb.net/Demo")
    .then(() => console.log('Connected to MongoDB!'))
    .catch((error) => console.error('Error connecting to MongoDB:', error));
  
app.listen(3000,()=>{
    console.log('running')
})