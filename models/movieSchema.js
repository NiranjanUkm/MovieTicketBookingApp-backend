const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [1, 'Title must be at least 1 character long'],
        maxlength: [100, 'Title must be less than 100 characters'],
    },
    poster: {
        type: String, // Change this to accept file paths
        required: [true, 'Poster path is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [1000, 'Description must be less than 1000 characters'],
    },
    language: {
        type: [String],
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length > 0 && v.every(item => typeof item === 'string');
            },
            message: 'Language should be a non-empty array of strings',
        },
    },
    genre: [{ // New field for genres
        type: [String],
        required: [true, 'At least one genre is required'],
    }],
    isSubtitle: {
        type: Boolean,
        default: false,
    },
    subtitle: {
        type: [String],
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.every(item => typeof item === 'string');
            },
            message: 'Subtitle should be an array of strings',
        },
    },
}, {
    timestamps: true,
});

const MovieModel = mongoose.model('Movies', movieSchema);
module.exports = MovieModel;
