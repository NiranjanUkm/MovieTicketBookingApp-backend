const MovieModel = require('../../models/movieSchema');

// Create a new movie
exports.addMovie = async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ error: 'No data provided' });
        }

        const newMovie = new MovieModel(data);

        await newMovie.save();
        res.status(201).json({ message: 'Movie added successfully', movie: newMovie });

    } catch (error) {
        res.status(400).json({ error: error.message || 'Failed to add movie' });
    }
};

// Get all movies
exports.getMovies = async (req, res) => {
    try {
        const movies = await MovieModel.find();
        res.status(200).json(movies);

    } catch (error) {
        res.status(400).json({ error: error.message || 'Failed to retrieve movies' });
    }
};

// Get a movie by ID
exports.getMovieById = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await MovieModel.findById(id);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json(movie);

    } catch (error) {
        res.status(400).json({ error: error.message || 'Failed to retrieve movie' });
    }
};

// Update a movie by ID
exports.updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const movie = await MovieModel.findByIdAndUpdate(id, updatedData, { new: true, runValidators: true });

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie updated successfully', movie });

    } catch (error) {
        res.status(400).json({ error: error.message || 'Failed to update movie' });
    }
};

// Delete a movie by ID
exports.deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await MovieModel.findByIdAndDelete(id);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully' });

    } catch (error) {
        res.status(400).json({ error: error.message || 'Failed to delete movie' });
    }
};
