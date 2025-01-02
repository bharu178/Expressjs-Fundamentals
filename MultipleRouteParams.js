const express=require('express')
const app=express()
app.get('/user/:userID/post/:postID',(req,res)=>{
    const userID=req.params.userID
    const postID=req.params.postID
    res.send(`userId:${userID},postID:${postID}`)
})
app.listen(3000,()=>{
    console.log('running')
})