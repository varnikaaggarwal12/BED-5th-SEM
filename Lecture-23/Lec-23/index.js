const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use(userRoutes);
app.use(blogRoutes);

mongoose
  .connect("mongodb://127.0.0.1:27017/blogsdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.listen(1427, () => {
  console.log("Server started on port 1427");
});