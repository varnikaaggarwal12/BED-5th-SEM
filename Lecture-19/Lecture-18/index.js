const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Require models
let Blog = require("./model/blog");
let User = require("./model/user");

// Require routes
let blogRoutes = require("./routes/blogRoutes");
let userRoutes = require("./routes/userRoutes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/blogsdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.listen(1427, () => {
  console.log("Server started on port 1427");
});