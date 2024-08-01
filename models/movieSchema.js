const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: String,
    poster: String,
    description: String,
    language: Array,
    isSubtitle: Boolean,
    Subtitle: Array,
}, {
    timestamps: true
});

const MovieModel = mongoose.model('Movies', movieSchema);
module.exports = MovieModel;

