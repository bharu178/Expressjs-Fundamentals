const express=require('express')
const app=express()
app.use(express.json())
app.put('/user/:id',(req,res)=>{
    const id=req.params.id
    const updateData=req.body
    res.send(`Updated successfully${id},${updateData.name}`)
})
app.listen(3000,()=>{
    console.log('running')
})