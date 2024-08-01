const mongoose = require('mongoose')

const theatreSchema = new mongoose.Schema({
    name: String,
    city: theatreSchema.ObjectId,
    beverages: Boolean,
    movies: Array,
}, {
    timestamps: true
});

const TheatreModel = mongoose.model('Theatres', theatreSchema);
module.exports = TheatreModel;

