const jwt = require('jsonwebtoken');
const UserModel = require('../models/authUserSchema'); 

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ error: 'No token provided. Please log in to obtain a token.' });
    }

    try {
        // Check if JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is not set.");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded payload:", decoded);  // Move console.log here

        req.user = await UserModel.findById(decoded.id);
        if (!req.user) {
            return res.status(401).json({ error: 'Invalid token: User does not exist.' });
        }

        // Log successful authentication for monitoring
        console.log(`User ${req.user.username} authenticated successfully.`);
        
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token. Please log in again.' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Token has expired. Please log in again.' });
        }
        res.status(401).json({ error: 'Authentication failed. Please check your token.' });
    }
};

module.exports = authenticate;
