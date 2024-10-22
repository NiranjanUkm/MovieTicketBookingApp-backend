const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'City name is required'],
        unique: true, // Ensure unique city names
        minlength: [2, 'City name must be at least 2 characters long'],
        maxlength: [100, 'City name cannot be longer than 100 characters'],
    },
}, {
    timestamps: true,
});

const CityModel = mongoose.model('Cities', citySchema);
module.exports = CityModel;
