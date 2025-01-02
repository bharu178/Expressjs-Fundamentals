const express=require('express')
const app=express()
app.use(express.json())
app.post('/user',(req,res)=>{
    const newUser=req.body
    if (!newUser || !newUser.name) {
        return res.status(400).send('User data or name is missing');
    }
    res.status(201).json({ message: `New User: ${newUser.name}` });
})
app.listen(3000,()=>{
    console.log('running')
})