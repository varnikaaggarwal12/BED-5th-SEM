const express=require("express");
const router=express.Router();//small-->app
const Blog=require("../model/blog");
let {postAddBlog,getAllBlog,getOneBlog,deleteOneBlog}=require("../controller/blogController")
router.post("/",postAddBlog)

router.delete("/.blogId",deleteOneBlog)

// Get all blogs with user details
router.get("/",getAllBlog);

// Get a single blog with user details
router.get("/:id",getOneBlog);


module.exports=router