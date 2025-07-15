const fs=require("fs");
fs.readFile("../demo.txt","utf-8",function(err,data){//by default buffer
    if(err) return console.log(err);
    console.log(data)
})
fs.readFile("../demo.txt","utf-8",function(err,data){//by default buffer
    if(err) return console.log(err);
    console.log(data)
})