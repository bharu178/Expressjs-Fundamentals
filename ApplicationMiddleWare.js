const express=require('express')
const app=express()
app.use((req,res,next)=>{
    console.log('Application middleware')
    console.log(`Request method:${req.method},URL:${req.url},Time:${Date.now()}`)
    next()
})
app.get('/',(req,res)=>{
    res.send("Hello world")
})
app.listen(3000,()=>{
    console.log('running')
})