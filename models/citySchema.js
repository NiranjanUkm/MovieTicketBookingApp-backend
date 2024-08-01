const mongoose = require('mongoose')

const citySchema = new mongoose.Schema({
    Name: String,
}, {
    timestamps: true
});

const CityModel = mongoose.model('Cities', citySchema);
module.exports = CityModel;

