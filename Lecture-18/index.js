const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Blog = require("./model/blog");
const User = require("./model/user");

// Create a new user
app.post("/users", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({
      success: true,
      message: "User created successfully",
      data: newUser
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Create a new blog for a user
// Create a new blog for a user
app.post("/blogs", async (req, res) => {
  try {
    const { title, body, userId } = req.body;
    const newBlog = new Blog({ title, body, userId });
    await newBlog.save();

    if (userId) {
      await User.findByIdAndUpdate(userId, { $push: { blogs: newBlog._id } });
    }

    // Populate the user data before sending response
    const populatedBlog = await Blog.findById(newBlog._id).populate("userId");

    res.json({
      success: true,
      message: "Blog created successfully",
      data: populatedBlog
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.delete("/blogs/.blogId",async(req,res)=>{
    let blogId=req.params.blogId;
    let userId=req.params.userId;
    let blogExist=await Blog.findById(blogId);
    if(!blogExist){
        return res.json({
            success:false,
            message:"blog does not exist"
        })
    }
    if(blogExist.userId!=userId){
        return res.json({
            success:false,
            message:"permission denied"
        })
    }
    await Blog.findByIdAndDelete(blogId);
})

// Get all blogs with user details
// app.get("/blogs", async (req, res) => {
//   try {
//     const blogs = await Blog.find().populate("userId");
//     res.json({
//       success: true,
//       message: "Blogs fetched successfully",
//       data: blogs
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err.message });
//   }
// });

// Get a single blog with user details
app.get("/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("userId");
    res.json({
      success: true,
      message: "Blog fetched successfully",
      data: blog
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

mongoose
  .connect("mongodb://127.0.0.1:27017/blogsdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.listen(2557, () => {
  console.log("Server started on port 1427");
});