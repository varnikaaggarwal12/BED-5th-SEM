const express=require("express");
const router=express.Router();//small-->app
const User=require("../model/user");
let{postAddUser}=require("../controller/userController")
router.post("/users",postAddUser);




module.exports=router