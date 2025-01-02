const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.send('Welcome')
})
app.get('/user',(req,res)=>{
    const user=[
        {id:1,name:'krishna'},
        {id:2,name:'Teja'}
    ]
    res.json(user)
})
app.listen(3000,()=>{
    console.log('running')
})