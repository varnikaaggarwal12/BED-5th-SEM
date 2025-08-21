const express=require("express");
const { m2, m1, checkAdmin } = require("./middleware/middleware");
const app=express();
app.use(express.static(__dirname+"/public"))
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const blogRoutes=require("./routes/blogsRoutes")
app.use(m1)
// app.use(m2);
app.get("/home",(req,res,next)=>{
    console.log("running controller home")
    res.json({
        success:true,
        message:"welcome to home page"
    })
    next()
})
app.use(m2);
app.get("/dashboard",checkAdmin,(req,res)=>{
    if(req.isAdmin){
        return res.json({
        success:true,
        message:"admin dashboard"
        })
    }
    return res.json({
    sucess:false,
    message:"unauthorized"
    })
    
})
//middleware run in order what we call
//m1 then controller then m2 -controller is also middleware and in order it can run
app.use("/api/blogs",blogRoutes)

app.listen(2557,()=>{
    console.log("server started");
})