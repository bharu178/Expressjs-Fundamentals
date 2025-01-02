const express=require('express')
const app=express()
const {body,validationResult}=require('express-validator')
app.use(express.json())
app.post('/submit',[
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({min:6}).withMessage('password must be atleast 6 characters long')],
    (req,res)=>{
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        res.send('Form submitted successfully')
    }
)
app.listen(3000,()=>{
    console.log('running')
})