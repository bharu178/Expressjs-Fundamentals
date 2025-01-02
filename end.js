const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    //res.send('Hello')
    res.status(204).end()
    res.send('world')
})
app.listen(3000,()=>{
    console.log('running')
})