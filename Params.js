const express=require('express')
const app=express()
app.get('/user/:id',(req,res)=>{
    const userid=req.params.id;
    res.send(`User Id:${userid}`)
})
app.listen(3000,()=>{
    console.log('running')
})