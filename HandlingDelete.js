const express=require('express')
const app=express()
app.delete('/user/:userId',(req,res)=>{
    const userId=req.params.userId
    res.send(`UserId${userId} is deleted successfully`)
})
app.listen(3000,()=>{
    console.log('running')
})