const app = require("express")
const router = app.Router()
const mongoose = require("mongoose")
const userPosts = mongoose.model("Post")
const logginReq = require("../middleWare/loginService")

router.get("/myPost",logginReq,(req,res)=>{

    const userId = req.user._id
    console.log("user Id --->"+userId)
    userPosts.find({posted_By:userId}).populate("posted_By","_id name").then((posts)=>{
        console.log("post-->"+posts)
       // posts.posted_By.password=undefined
        res.status(200).json({posts})
    }).catch((err)=>{
        res.status(400).json({error:"Uable to find resources"})

    })
})

router.post("/createPost",logginReq,(req,res)=>{

    const{title,body,photo}=req.body

    if(!title || !body){
        return res.status(400).json({provide:"Please provide title or body"})
    }

    req.user.password = undefined;
    const post = new userPosts({
        title,
        body,
        posted_By:req.user
    })

    post.save().then((savedPost)=>{

        console.log("Post has been saved")
        res.status(200).json({savedPost})
    }).catch((err)=>{
        res.status(401).json("Something went wrong")
    })

})

module.exports= router