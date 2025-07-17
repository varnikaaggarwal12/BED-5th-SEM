const fs=require("fs");
const {resolve}=require("path");
    function read(file){
        return new Promise((resolve,reject)=>{
            fs.readFile(file,"utf-8",function(err,data){//by default buffer
                if(err) return reject(err);
                // console.log(data[0])
                let users=JSON.parse(data)
                resolve(users)
            })
        })
    
    
}
function write(file,data){
    return new Promise((resolve,reject)=>{
        fs.writeFile(file,data,function(err){//string hi jati hai object doesntt conatin in string(json)//key v value string v value converted in object also
            if(err) return reject(err);
            resolve("done")
        })
        
        
    })
}
module.exports.write=write;
module.exports.read=read;

