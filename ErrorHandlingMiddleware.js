const express=require('express')
const app=express()
app.get('/a',(req,res)=>{
    throw new Error('Broken')
})
app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('something is broken')
})
app.listen(3000,()=>{
    console.log('running')
})