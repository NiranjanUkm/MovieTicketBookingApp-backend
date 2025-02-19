const mongoose = require('mongoose');

const profileUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        set: value => value.toLowerCase(), // Normalize email
    },
    phone: {
        type: String,
        // required: [true, 'Phone number is required'],
        match: [/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'], // E.164 format
    },
    address: {
        type: String,
        default: '', // Default value for address
    },
    city: {
        type: String,
        default: '',
    },
    state: {
        type: String,
        default: '',
    },
    country: {
        type: String,
        default: '',
    },
    pincode: {
        type: String,
        default: '',
        match: [/^\d{5,6}$/, 'Please enter a valid pincode'], // Validates 5-6 digit pincodes
    }
}, {
    timestamps: true // Automatically create createdAt and updatedAt fields
});

const ProfileUserModel = mongoose.model('ProfileUsers', profileUserSchema);
module.exports = ProfileUserModel;
