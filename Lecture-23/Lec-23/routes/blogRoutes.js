const express = require("express");
const router = express.Router();
const { createBlog, deleteBlog, getBlog } = require("../controllers/blogController");

const isLogin = require("../middleware/auth");

router.post("/blogs", isLogin, createBlog);
router.delete("/blogs/:blogId/:userId", deleteBlog);
router.get("/blogs/:id", getBlog);

module.exports = router;