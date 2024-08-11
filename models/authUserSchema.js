const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const authUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters long'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Confirm password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Hash password before saving
authUserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    if (this.password !== this.confirmPassword) {
        return next(new Error('Passwords do not match'));
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    this.confirmPassword = undefined; // Remove confirmPassword from the document
    next();
});

const AuthUserModel = mongoose.model('AuthUsers', authUserSchema);
module.exports = AuthUserModel;
