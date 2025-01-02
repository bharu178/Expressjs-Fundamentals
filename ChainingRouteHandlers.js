const express=require('express')
const app=express()
app.route('/user')
.get((req,res)=>{
    res.send('Fetching user data')
})
.post((req,res)=>{
    res.send('User data created')
})
.patch((req,res)=>{
    res.send('User data updated')
})
app.listen(3000,()=>{
    console.log('running')
})