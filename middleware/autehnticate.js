const jwt = require('jsonwebtoken');
const UserModel = require('../models/authUserSchema'); // Adjust path if necessary

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.userId);
        if (!req.user) {
            return res.status(401).json({ error: 'Invalid token' });
        }
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};

module.exports = authenticate;
