const fs= require("fs");
console.log(fs);
console.log("start");
setTimeout(()=>{
    console.log("settimeout")
},0)
setImmediate(()=>{
    console.log("set Immediate")
})
fs.readFile("demo.txt","utf-8",(err,data)=>{
    console.log("file read");
    console.log(data);
    setTimeout(()=>{
        console.log("timer 2");
    },0)
    setImmediate(()=>{
        console.log("immediate 2");
    })
})
function someTask(){
    return new Promise((resolve,reject)=>{
        resolve("promise")
    })
}
someTask().then((data)=>{
    console.log(data)
})
.catch((err)=>{
    console.log(err)
})
process.nextTick(()=>{
    console.log("next tick")
    console.log("next tick")
})
console.log("end");