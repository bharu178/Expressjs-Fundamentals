const express=require('express')
const app=express()
app.get('/method',(req,res)=>{
    const header=req.headers
    res.json(header)
})
app.listen(3000,()=>{
    console.log('running')
})