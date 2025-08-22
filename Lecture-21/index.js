const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./models/user");
const jwt = require("jsonwebtoken");
const app = express();
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1:27017/mydb")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

function isLogin(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "okkkk");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
}

app.get("/home", isLogin, (req, res) => {
  res.json({
    success: true,
    message: "welcome",
    user: req.user
  });
});

app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.send("User already exists");
    const user = new User({ name, email, password });
    await user.save();
    res.send("User registered successfully");
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.send("Invalid email or password");
    if (user.password !== password) return res.send("Invalid email or password");
    const token = jwt.sign({ userId: user._id }, "okkkk");
    res.json({ message: "Login successful", token });
  } catch (err) {
    res.send("Error: " + err.message);
  }
});

app.listen(1427, () => {
  console.log("Server Started");
});