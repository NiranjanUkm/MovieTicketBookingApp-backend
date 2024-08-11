const mongoose = require('mongoose');

const profileUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [3, 'Name must be at least 3 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
        type: Number,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function (v) {
                return /\d{10}/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    },
    Address: {
        h_name: {
            type: String,
            required: [true, 'House name is required']
        },
        street: {
            type: String,
            required: [true, 'Street is required']
        },
        city: {
            type: String,
            required: [true, 'City is required']
        },
        pin: {
            type: Number,
            required: [true, 'PIN code is required'],
            validate: {
                validator: function (v) {
                    return /\d{6}/.test(v);
                },
                message: props => `${props.value} is not a valid PIN code!`
            }
        }
    }
}, {
    timestamps: true
});

const ProfileUserModel = mongoose.model('ProfileUsers', profileUserSchema);
module.exports = ProfileUserModel;
