let account_balance= 200000000;
let products=[
    {
        name:"samsung",
        amount:70000,
        quantity:10
    },
     {
        name:"Iphone 16",
        amount:10000,
        quantity:1
    }
]
function buyProduct(product_name,cb){
    return new Promise((resolve,reject)=>{
    let isproduct =null
 for(let i =0 ; i<products.length;i++){
    if(products[i].name==product_name){
        isproduct=products[i];
        break;
    }
 }
 if(!isproduct){
    reject("product is not available",null)
 }else{
    resolve(isproduct.amount);
 }
    });

 }
 function deductAmount(amount){
    return new Promise((resolve,reject)=>{


    if(amount>account_balance){
        return reject("your account balanace is low")
    }else{
        account_balance-=amount;
        return resolve("your product is purchased")
        
    }
    })

}
//  buyProduct("Iphone 16")
//  .then((data)=>{
//     return deductAmount(data)
//  })
//  .then ((message)=>{
//     console.log(message)
//     console.log(account_balance)
//  })
//  .catch((err)=>{
//     console.log(err)
//  })
async function myfun(){
    try{
let amount=await buyProduct("Iphone 16")
let message=await deductAmount(amount)
console.log(message)
}
catch(error){
    console.log(error)
}
}
console.log(myfun())
console.log("start");
console.log("end");