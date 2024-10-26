const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const authUserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minlength: [3, 'Username must be at least 3 characters long'],
        unique: true,
        index: true // Index for faster search
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        index: true, // Index for faster search
        set: value => value.toLowerCase() // Normalize email
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        validate: {
            validator: function (v) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/.test(v); // At least one uppercase, one lowercase, one number
            },
            message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number.'
        }
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
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

const AuthUserModel = mongoose.model('AuthUsers', authUserSchema);
module.exports = AuthUserModel;
    