const Blog = require("../model/blog");
const User = require("../model/user");

// Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.user.userId;

    const newBlog = new Blog({ title, body, userId });
    await newBlog.save();

    await User.findByIdAndUpdate(userId, { $push: { blogs: newBlog._id } });

    const populatedBlog = await Blog.findById(newBlog._id).populate("userId");

    res.json({
      success: true,
      message: "Blog created successfully",
      data: populatedBlog
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Delete Blog
exports.deleteBlog = async (req, res) => {
  try {
    let { blogId, userId } = req.params;
    let blogExist = await Blog.findById(blogId);

    if (!blogExist) {
      return res.json({ success: false, message: "Blog does not exist" });
    }

    if (blogExist.userId.toString() !== userId) {
      return res.json({ success: false, message: "Permission denied" });
    }

    await Blog.findByIdAndDelete(blogId);

    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// Get Single Blog
exports.getBlog = async (req, res) => {
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
};