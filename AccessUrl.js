const express=require('express')
const app=express()
app.get('/method',(req,res)=>{
    res.send(`Body:${req.url}`)
})
app.listen(3000,()=>{
    console.log('running')
})