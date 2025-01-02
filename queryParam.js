const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    const q=req.query.q
    if(q){
        res.send(`Search Query:${q}`)
    }
    else{
        res.status(400).send('Query parameter is needed')
    }
})
app.listen(3000,()=>{
    console.log('running')
})