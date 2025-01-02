const bcrypt=require("bcrypt")
const password="bhargavi@1122"
const salRound=10;
bcrypt.hash(password,salRound,(err,hash)=>{
    if(err){
        console.err('error')
    }
    console.log("Hashing password:",hash)
bcrypt.compare(password,hash,(err,result)=>{
    if(err){
        console.error(err)
    }
    if(result){
        console.log("password is matched")
    }
    else{
        console.log("Password is not matched")
    }
})
})
//Refactored code by using async/await
const hashingPassword=async()=>{
    try{
        const hash=await bcrypt.hash(password,salRound);
        console.log(hash)
        const isMatch=await bcrypt.compare(password,hash);
        if(isMatch)
            console.log("Password is matched")
        else
            console.log("password is mismatched")
    }
    catch(error){
        console.error(err)
    }
}
hashingPassword()