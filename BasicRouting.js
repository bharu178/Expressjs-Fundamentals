const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.send('Hii')
})
app.get('/hii',(req,res)=>{
    res.send('Namaste')
})
app.get('/namaste',(req,res)=>{
    res.send('Welcome')
})
app.listen(3000,()=>{
    console.log('running')
})