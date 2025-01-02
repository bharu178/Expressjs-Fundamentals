const express=require('express')
const app=express()
app.get('/user/:userID/post/:postId?',(req,res)=>{
    const userID=req.params.userID
    const postId=req.params.postId?req.params.postId:'No postId provideed'
    res.send(`user:${userID},post:${postId}`)
})
app.listen(3000,()=>{
    console.log('running')
})