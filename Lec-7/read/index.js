const fs=require("fs");
// fs.readFile("../users.txt","utf-8",function(err,data){//by default buffer
//     if(err) return console.log(err);
//     // console.log(data[0])
//     let users=JSON.parse(data)
//     console.log(users[0])
// })
// fs.readFile("../users2.txt","utf-8",function(err,data){//by default buffer
//     if(err) return console.log(err);
//     // console.log(data[0])
//     let users=JSON.parse(data)
//     console.log(users[0])
// })

const { read }=require("../IO/io.js");
async function readusers(){
    let users=await read("../users.txt")
    let users2=await read("../users2.txt");
    console.log(users)
    console.log(users2)
    
}
readusers();