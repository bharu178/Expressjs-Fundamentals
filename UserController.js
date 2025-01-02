const getUser=(req,res)=>{
    res.send('Get all the users')
}
const getUserById=(req,res)=>{
    res.send(`UserId:${req.params.id}`)
}
const createUser=(req,res)=>{
    res.send(`UserName:${JSON.stringify(req.body.name)}`)
}
module.exports={getUser,getUserById,createUser};