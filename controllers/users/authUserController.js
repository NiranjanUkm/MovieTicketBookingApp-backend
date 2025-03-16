const User = require('../../models/authUserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;

  if (password.trim() !== confirmPassword.trim()) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({
    username,
    email,
    password,
    isAdmin: false,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' }),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user is inactive
    if (!user.isActive) {
      return res.status(403).json({ message: "This account is inactive. Please contact the admin." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    if (user.isAdmin) {
      return res.status(200).json({ message: "Redirect to admin dashboard", token, isAdmin: true });
    } else {
      return res.status(200).json({ message: "Redirect to user page", token, isAdmin: false });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Fetch all users
const getAllUsers = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized. Admin access required." });
    }
    const users = await User.find({}).select('username email isActive updatedAt');
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// Toggle user status
const toggleUserStatus = async (req, res) => {
  try {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized. Admin access required." });
    }
    const { userId } = req.params;
    const { isActive } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { isActive },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User status updated", user });
  } catch (error) {
    console.error('Error toggling user status:', error);
    res.status(500).json({ message: "Failed to update user status" });
  }
};

module.exports = { register, login, getAllUsers, toggleUserStatus };