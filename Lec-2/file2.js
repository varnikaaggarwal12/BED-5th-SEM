let file3=require("./file3.js")
console.log(file3);
let res=file3.add(2,3);
console.log(res);
function divide(a,b){
    return a/b;
}
// module.exports.multiply=multiply;
module.exports.divide=divide;