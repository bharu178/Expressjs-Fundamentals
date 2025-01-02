const express=require('express')
const app=express()
app.use(express.json())
app.post('/user',(req,res)=>{
    res.send(`RecievedData:${JSON.stringify(req.body)}`)
})
app.listen(3000,()=>{
    console.log('running')
})