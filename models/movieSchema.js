const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minlength: [1, 'Title must be at least 1 character long'],
        maxlength: [100, 'Title must be less than 100 characters']
    },
    poster: {
        type: String,
        validate: {
            validator: function (v) {
                return /^(https?:\/\/.*\.(?:png|jpg|jpeg))$/i.test(v);
            },
            message: 'Poster must be a valid URL (PNG, JPG, JPEG)'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [10, 'Description must be at least 10 characters long'],
        maxlength: [1000, 'Description must be less than 1000 characters']
    },
    language: {
        type: [String],
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length > 0 && v.every(item => typeof item === 'string');
            },
            message: 'Language should be a non-empty array of strings'
        }
    },
    isSubtitle: {
        type: Boolean,
        default: false
    },
    Subtitle: {
        type: [String],
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.every(item => typeof item === 'string');
            },
            message: 'Subtitle should be an array of strings'
        }
    }
}, {
    timestamps: true
});

const MovieModel = mongoose.model('Movies', movieSchema);
module.exports = MovieModel;
