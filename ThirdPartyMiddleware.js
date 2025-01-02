const express=require('express')
const app=express()
const morgan=require('morgan')
app.use(morgan('combined'))
app.get('/',(req,res)=>{
    res.send('Logging with morgan')
})
app.listen(3000,()=>{
    console.log('running')
})