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
    beverage: { // Changed to match controller and frontend
        type: Boolean,
        default: false,
    },
    runningMovies: [{ // Changed to match controller and frontend
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Movies',
    }],
    ticketPrice: {
        type: Number,
        required: [true, 'Ticket price is required'],
        min: [0, 'Ticket price cannot be negative']
    }
}, {
    timestamps: true,
});

const TheatreModel = mongoose.model('Theatres', theatreSchema);
module.exports = TheatreModel;
