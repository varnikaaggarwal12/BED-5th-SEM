const express = require("express");
const app = express();

app.get("/",(req,res)=>{
console.log(req);
//res.send("Hello World") //text
//res.send("<h1>Hello World</h1>") //html
res.json({
    name:"Rashi",
    address:"Kurukshetra",
    isLogin:true
})
})

//path parameter/variable!
//1.params
app.get("/users/:id",(req,res)=>{
    console.log(req.params.id);
    let id = req.params.id;
    res.send(id);
    //res.send("ok");
})

//2. query parameters
app.get("/blogs",(req,res)=>{
    console.log(req.query.title);
    console.log(req.query.desc);
    res.send("got it");
})
// app.get("/users",(req,res)=>{
// res.json({
//     name:"Rashi",
//     address:"Kurukshetra",
//     isLogin:true,
//     Phonenumber:"8307418010"
// })
// })

app.listen(1427,()=>{
    console.log("Server started");                        
})