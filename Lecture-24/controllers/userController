const User = require("../model/user");
const jwt = require("jsonwebtoken");

// Create User
exports.createUser = async (req, res) => {
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
};

// Login
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not found" });

    if (user.password !== password) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign({ userId: user._id }, "okkkk");

    res.json({
      success: true,
      message: "Login successful",
      token
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};