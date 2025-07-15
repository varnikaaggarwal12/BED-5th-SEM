const fs= require("fs");

// fs.writeFile("../demo.txt","hello g27" , function(err){
//     if(err) return console.log(err);
//     console.log("success!!")
// })
fs.writeFile("../demo2.txt","hello vaani\n" , function(err){
    if(err) return console.log(err);
    console.log("success!!")
})
