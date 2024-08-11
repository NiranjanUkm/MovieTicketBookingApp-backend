const AuthUserModel = require('../../models/authUserSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register
exports.register = async (req, res) => {
    const { username, email, password, confirmPassword, isAdmin } = req.body;


    const user = new AuthUserModel({ username, email, password, confirmPassword, isAdmin });
    await user.save();

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.status(201).json({ token });

};

// Login
exports.login = async (req, res) => {
    const { email, password } = req.body;


    const user = await AuthUserModel.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Invalid email or password' });

    }
    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
        expiresIn: '1h'
    });

    res.status(200).json({ token });

};
