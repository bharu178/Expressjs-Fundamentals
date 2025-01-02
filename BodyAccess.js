const express=require('express')
const app=express()
app.use(express.json())
app.post('/',(req,res)=>{
    res.send(`The data:${JSON.stringify(req.body)}`)
})
app.listen(3000,()=>{
    console.log('running`')
})