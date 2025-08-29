const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Serve static files from public/
app.use(express.static(path.join(__dirname, "public")));

// Routes
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

// ✅ Add prefixes for API
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

app.post("/api/users/signup", (req, res) => {
  // Save user logic
  res.json({ success: true, message: "Signup successful!" });
});

app.post("/api/users/login", (req, res) => {
  // Verify user logic
  res.json({ success: true, message: "Login successful!", userId: "123" });
});

// ---------------- BLOG ROUTES ----------------
let blogs = []; // temp in-memory storage

app.post("/api/blogs/add", (req, res) => {
  const { title, content, userId } = req.body;
  if (!title || !content) {
    return res.json({ success: false, message: "Title & content required" });
  }
  let blog = { id: blogs.length + 1, title, content, author: { name: "User" }, userId };
  blogs.push(blog);
  res.json({ success: true, message: "Blog added", blog });
});

app.get("/api/blogs/all", (req, res) => {
  res.json(blogs);
});

app.get("/api/blogs/my/:userId", (req, res) => {
  let myBlogs = blogs.filter(b => b.userId === req.params.userId);
  res.json(myBlogs);
});


// Connect MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/blogsdb")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error(err));

app.listen(1427, () => {
  console.log("🚀 Server started on http://localhost:1427");
});
