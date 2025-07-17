const fs=require("fs")
let users=[
    {
        id:1,
        name:"Vaani",
        age:"20"
    },
    {
        id:2,
        name:"varnika",
        age:"19"
    },
]
let users2=[
    {
        id:1,
        name:"parneet",
        age:"20"
    },
    {
        id:2,
        name:"rashi",
        age:"19"
    },
]

fs.writeFile("../users.txt",JSON.stringify(users),function(err){//string hi jati hai object doesntt conatin in string(json)//key v value string v value converted in object also
    if(err) return console.log(err);
    console.log("users written")
})
fs.writeFile("../users2.txt",JSON.stringify(users2),function(err){//string hi jati hai object doesntt conatin in string(json)//key v value string v value converted in object also
    if(err) return console.log(err);
    console.log("users written 2")
})

