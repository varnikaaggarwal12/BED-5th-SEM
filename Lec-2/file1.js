let file3=require("./file3.js");
console.log(file3);
let res=file3.multiply(2,3);
console.log(res)
function sub(a,b){
    return a-b;
}
// module.exports.add=add;
module.exports.sub=sub;
