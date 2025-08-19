module.exports.postAddUser=async (req, res) => {
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
}