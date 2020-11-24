const jwt = require("jsonwebtoken")
const moongose = require("mongoose")
const User = moongose.model("User")
const {JWT_Secret} = require("../keys")

module.exports=(req,res,next)=>{
   
    const{authorization} = req.headers
    if(!authorization){
     return  res.send(403).json({error:"Token not found"})
    }

    const token  = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_Secret,(err,payload)=>{
        if(err){
            return res.status(401).json({error:"user not logged in"})
        }
        const{_id} = payload;
        console.log(payload)
        console.log(_id)
        User.findOne({_id}).then((loggedUser)=>{
            req.user = loggedUser
            next();
        }).catch((err)=>{
            res.status(401).json(err + "User not found in")
        })
    })
 
}