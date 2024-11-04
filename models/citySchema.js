const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'City name is required'],
        unique: true,
        minlength: [2, 'City name must be at least 2 characters long'],
        maxlength: [100, 'City name cannot be longer than 100 characters'],
    },
    description: {
        type: String,
        maxlength: [500, 'Description cannot exceed 500 characters'],
        default: '',
    },
    theatres: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Theatres' // Reference the exact model name of the theatre
    }],
}, {
    timestamps: true,
});

const CityModel = mongoose.model('Cities', citySchema);
module.exports = CityModel;
