const express=require('express')
const app=express()
app.get('/setheader', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send('<h1>Header Set</h1>');
});

app.listen(3000,()=>{
    console.log('running')
})