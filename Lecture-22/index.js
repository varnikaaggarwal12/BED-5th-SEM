const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const Blog = require("./model/blog");
const User = require("./model/user");


app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.password !== password) {
      return res.json({ success: false, message: "Wrong password" });
    }

    // create token with secret key "okkkk"
    const token = jwt.sign({ userId: user._id }, "okkkk");

    res.json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Middleware to check login
function isLogin(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(" ")[1]; // Bearer <token>
  if (!token) {
    return res.status(401).json({ success: false, message: "Invalid token format" });
  }

  try {
    const decoded = jwt.verify(token, "okkkk"); // use your secret
    req.user = decoded; // store decoded data
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}

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

// Create a new blog for a user (protected)
app.post("/blogs", isLogin, async (req, res) => {
  try {
    const { title, body } = req.body;
    const userId = req.user.userId; // take userId from token
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
});

// Delete a blog
app.delete("/blogs/:blogId/:userId", async (req, res) => {
  try {
    let { blogId, userId } = req.params;
    let blogExist = await Blog.findById(blogId);

    if (!blogExist) {
      return res.json({
        success: false,
        message: "Blog does not exist"
      });
    }

    if (blogExist.userId.toString() !== userId) {
      return res.json({
        success: false,
        message: "Permission denied"
      });
    }

    await Blog.findByIdAndDelete(blogId);

    res.json({
      success: true,
      message: "Blog deleted successfully"
    });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

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