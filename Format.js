const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.format({
        'text/plain':()=>{
            res.send('send the plain text')
        },
        'text/html':()=>{
            res.send('<p>Send the html content')
        },
        'application/json':()=>{
            res.send({message:'Json format'})
        }

    }

    )
})
app.listen(3000,()=>{
    console.log('running')
})