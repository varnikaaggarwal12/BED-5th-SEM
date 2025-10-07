const express=require("express")
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))
const userRoutes=require("./routes/userRoutes")
app.use("/api/users",userRoutes)
app.listen(2557,()=>{
    console.log("server started")
})
// async function addUser(email,name){
//     const newUser = await prisma.user.create({
//         data:{
//             email:email,
//             name:name
//         }
//     })
// }
    // addUser("varnika2557@gmail.com","varnika123")
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
// addTweet(4,"my first tweet")
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
// async function deleteUser(id){
//     await prisma.user.delete({
//         where:{
//             id:Number(id)
//         }
//     })
//     return "user deleted"
// }
// deleteUser("1")
// .then((data)=>console.log(data))
async function readTweets(){
    //select ,include
    //read all tweets
    let alltweets=await prisma.tweet.findMany({
        include:{
            user:{
                select:{
                    name:true
                }
            }
        }
    })
    return alltweets;
}
readTweets()
.then((data)=>console.log(data))
.catch((err)=>console.log(err));