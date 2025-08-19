const User=require("../model/user")
const Blog=require("../model/blog")
module.exports.postAddBlog=async (req, res) => {
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
}
module.exports.deleteOneBlog=async(req,res)=>{
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
}
module.exports.getAllBlog= async (req, res) => {
  try {
    const blogs = await Blog.find().populate("userId");
    res.json({
      success: true,
      message: "Blogs fetched successfully",
      data: blogs
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}
module.exports.getOneBlog= async (req, res) => {
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
}