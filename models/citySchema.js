const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, 'City name is required'],
        minlength: [2, 'City name must be at least 2 characters long'],
        maxlength: [100, 'City name cannot be longer than 100 characters']
    }
}, {
    timestamps: true
});

const CityModel = mongoose.model('Cities', citySchema);
module.exports = CityModel;
