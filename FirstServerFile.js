const express=require('express')
const app=express()
const port=3000
app.get('/',(req,res)=>{
    res.send('Hello,This is my first express js program')
})
app.listen(port,()=>{
    console.log('server is running')
})