const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Theatre name is required'],
        minlength: [3, 'Theatre name must be at least 3 characters long'],
        maxlength: [100, 'Theatre name must be less than 100 characters']
    },
    city: {
        type: mongoose.Schema.Types.ObjectId, 
        required: [true, 'City is required'],
        ref: 'City'
    },
    beverages: {
        type: Boolean,
        default: false
    },
    movies: {
        type: [String],
        validate: {
            validator: function (v) {
                return Array.isArray(v) && v.length > 0 && v.every(item => typeof item === 'string');
            },
            message: 'Movies should be a non-empty array of strings'
        }
    }
}, {
    timestamps: true
});

const TheatreModel = mongoose.model('Theatres', theatreSchema);
module.exports = TheatreModel;
