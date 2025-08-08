const express=require("express")
const app=express()
app.use(express.json())
app.use(express.static(__dirname+"/public"))
app.use(express.urlencoded())

app.post('/user',(req,res)=>{
    try{
    let email=req.body.email;
    let password=req.body.password;
    console.log("User received:", email, password);
    res.json({ message: "User added successfully", email ,password});
    } catch(error){
        res.json({
            success:false,
            message:error.message
        })
    }
})


app.listen(2557,()=>{
 console.log("server started")
})