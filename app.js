
//Node.js is a runtime environment used for executing JavaScript code outside of a browser.
//It’s not a framework.
//Express.js is the de facto web application framework for Node.js.
//Node.js, developed primarily in JavaScript, uses an event-driven, single-threaded, 
//non-blocking I/O model. This makes it incredibly efficient and lightweight. 
//Perfect for very data-intensive applications that need to operate 
//in real-time across distributed devices.
//Non-blocking I/O: This is a very important concept to understand when learning about Node.js.
// This system allows a thread to work on another task while it is waiting for a different task to be completed.
// In other words, new tasks are not blocked while waiting for other tasks to finish. 
//How is this accomplished? Node.js relies on asynchronous functions.
//The benefit of this is that only one thread is being used, and as a result, we have low memory utilization. 
//Node.js is single-threaded. Also, you don’t have to worry about the problems associated with managing multiple 
//threads — whereas, in the Spring Boot world, Java web applications are used to running everything on multiple
// threads.

const express = require("express")
const mongoose = require("mongoose")
const app     = express()
const {MonoDB_URI} = require("./keys")
require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

//Schema 

const PORT = 5000

mongoose.connect(MonoDB_URI,{useNewUrlParser:true,  useUnifiedTopology: true })

mongoose.connection.on("connected",()=>{
    console.log("Connected to mongo")

})
mongoose.connection.on("error",()=>{
    console.log("Error while connecting to mongo")

})

const customMiddleware = (req,res,next)=>{
    console.log("middleware executed")
    next()
}


app.get("/",(req,res)=>{
    console.log("App get method executed")
    res.send("hello there")

})

app.listen(PORT,()=>{
    console.log("Server is running on ->"+PORT)
})