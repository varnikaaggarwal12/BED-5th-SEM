const { PrismaClient } = require("./generated/prisma");

let prisma = new PrismaClient();
// async function addUser(email,name){
//     const newUser = await prisma.user.create({
//         data:{
//             email:email,
//             name:name
//         }
//     })
// }
    // addUser("rashi1427@gmail","Rashi")
    // .then((data)=>console.log(data))
    // .catch((e)=>console.log(e))
    
    // async function getUser(email){
    //     let user = await prisma.user.findUnique({
    //          where:{
    //             email:email
    //          }
    //     })
    //     return user
    // }
    // getUser("Rashi@gmail","Rashi")
    // .then((data)=>console.log(data))
    // console.log("hii")

    async function addTweet(userId,body){
        try{
        let newTweet = await prisma.tweet.create({
           data:{
            userId:userId,
            body:body
           }
        })
        return newTweet;
    } catch(error){
        throw new Error(error.message)
    }
}
// addTweet(1,"my first tweet")
// .then((data)=>console.log(data))
// .catch((e)=>console.log(e))

// async function updateTweet(id,userId,updateBody){
//   let tweet = await prisma.tweet.findFirst({
//     where:{
//         id:Number(id),
//         userId:Number(userId)
//     }
//   })  
//   if(!tweet){
//     return "something went wrong"
//   }
//   await prisma.tweet.update({
//     where:{
//         id:Number(id)
//     },
//     data:{
//         body:updateBody
//     }
//   })
//   return "Tweet updated"
// }
// updateTweet("1","1","I am rashi")
// .then((data)=>console.log(data))
// .catch((e)=>console.log(e))
async function deleteUser(id){
    await prisma.user.delete({
        where:{
            id:Number(id)
        }
    })
    return "user deleted"
}
deleteUser("1")
.then((data)=>console.log(data))