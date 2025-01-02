const express=require('express')
const app=express()
const router=express.Router()
router.use((req,res,next)=>{
    console.log('Request url:',req.originalUrl)
    next()
})
router.get('/user',(req,res)=>{
    res.send('Router Middleware')
})
app.use('/router',router)
app.listen(3000,()=>{
    console.log('running')
})