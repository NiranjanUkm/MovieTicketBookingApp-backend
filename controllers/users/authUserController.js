// controllers/users/authUserController.js

const User = require('../../models/authUserSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user (isAdmin will always be false for frontend registration)
exports.register = async (req, res) => {
    console.log('Received request body:', req.body); // Add this line to debug
    const { username, email, password, confirmPassword } = req.body;
    console.log('Password Length:', password.length, 'ConfirmPassword Length:', confirmPassword.length);

    console.log('Password (trimmed):', password.trim().length);
    console.log("Password:", password);
    console.log('Password Length (trimmed):', password.trim().length);
    console.log("Confirm Password:", confirmPassword);


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
        // confirmPassword: hashedPassword,
        isAdmin: false  // Always set to false on frontend registration
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};

// Login and redirect based on isAdmin status
exports.login = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log("User:",user);
    console.log('Input Password:', user.password); // Log the input password

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

    if (user.isAdmin) {
        return res.status(200).json({
            message: "Redirect to admin dashboard",
            token,
            isAdmin: true
        });
    } else {
        return res.status(200).json({
            message: "Redirect to user page",
            token,
            isAdmin: false
        });
    }
};
