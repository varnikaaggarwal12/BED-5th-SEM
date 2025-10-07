const { PrismaClient } = require("./generated/prisma");

let prisma = new PrismaClient();
class User{
    static async function addUser(email,name){
    const newUser = await prisma.user.create({
        data:{
            email:email,
            name:name
        }
    })
    return "User Added"
}
static async function getUser(email){
        let user = await prisma.user.findUnique({
             where:{
                email:email
             }
        })
        return user
    }
    static async function deleteUser(id){
    await prisma.user.delete({
        where:{
            id:Number(id)
        }
    })
    return "user deleted"
    }

}