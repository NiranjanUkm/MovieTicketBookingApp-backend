const jwt = require('jsonwebtoken');
const UserModel = require('../models/authUserSchema');

const authenticate = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);  // Log header

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'No token provided. Please log in.' });
    }

    const token = authHeader.split(' ')[1]; // Extract token
    console.log("Extracted Token:", token);

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not set.");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token Payload:", decoded); // Log token content

        if (!decoded.id) {
            return res.status(401).json({ error: 'Token missing user ID.' });
        }

        req.user = await UserModel.findById(decoded.id);
        console.log("Fetched User:", req.user); // Log fetched user

        if (!req.user) {
            return res.status(401).json({ error: 'User not found in database.' });
        }

        console.log(`User ${req.user.username} authenticated successfully.`);
        next();
    } catch (error) {
        console.error("JWT Authentication Error:", error);
        return res.status(401).json({ error: 'Invalid or expired token. Please log in again.' });
    }
};

module.exports = authenticate;
