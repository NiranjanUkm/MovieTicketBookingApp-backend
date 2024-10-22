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
        ref: 'Cities', // Ensure this matches your City model
    },
    beverages: {
        type: Boolean,
        default: false,
    },
    movies: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies', // Reference to the Movies schema
    }],
}, {
    timestamps: true,
});

const TheatreModel = mongoose.model('Theatres', theatreSchema);
module.exports = TheatreModel;
