const app = require("express")
const router = app.Router();
const mongoose = require("mongoose")
const User = mongoose.model("User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const keys = require("../keys")
const middleware = require("../middleWare/loginService")
router.get("/",(req,res,next)=>{
// res.send("Hello from router")
next()
})

router.post("/signUp",(req,res)=>{

    console.log(req.body)
    const{name,email,password} = req.body

    if(!name || !email || !password){
       return res.status(442).json({error:"please add all the fields"});
    }
     
    else{
        console.log("inside else")

        User.findOne({email:email}).then((savedUser)=>{
            console.log("exist findOne")

            if(savedUser){
                console.log("exist")
                res.status(422).json("User Already exist")
            }
            else{

                bcrypt.hash(password,12).then((hasedPassKey)=>{
                    console.log("exist else find")
                    const user = new User({
                        name,
                        email,
                        password:hasedPassKey})
                    console.log("User created")
    
                    user.save().then((saved)=>{
                        console.log("exist")
                        res.status(200).json("User successfully added")
                    }).catch((err)=>{
                        console.log("exist")
                        res.json("Error while inserting user")
                    })

                }).catch((err)=>{
                    console.log("error while creating hash")
                })
              
            }

        }).catch((err)=>{

            res.json(err)
        })

        console.log("exiting else")
    }
    
    
    })

router.post("/signIn",(req,res)=>{

    const{email,password}=req.body

    if(!email || !password){
       return res.send("Please provide user email or password") 
    }

    User.findOne({email:email}).then((user)=>{

        bcrypt.compare(password,user.password).then(matched=>{
            if(matched){

                const token = jwt.sign({_id:user._id},keys.JWT_Secret);
                res.send({token})
 
            }
            else res.send("Incorrect email or password")
        }).catch((err)=>{
            console.log(err)
        })


    }).catch((err)=>{
            console.log("Password is not correct")
        })
    })

router.get("/protected",middleware,(req,res)=>{

    res.send("Hello this is a proteted data")

})

module.exports=router