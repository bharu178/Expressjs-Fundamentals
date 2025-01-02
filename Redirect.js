//send
//json
//status
const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.redirect('https://www.w3schools.com')
})
app.listen(3000,()=>{
    console.log('running')
})