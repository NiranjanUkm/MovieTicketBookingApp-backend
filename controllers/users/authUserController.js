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


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        console.log("User:", user);

        // If user is not found, return a 404 error
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        console.log('Stored Password:', user.password); // Log the stored password

        // Compare provided password with stored password hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        // Check if user is an admin and respond accordingly
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
    } catch (error) {
        console.error("Login Error:", error);  // Log unexpected errors
        res.status(500).json({ message: "Internal server error" });
    }
};

