const MovieModel = require('../../models/movieSchema');
const cloudinary = require('../../utils/cloudinaryConfig'); // Import Cloudinary configuration
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'posters', // Folder in Cloudinary
        allowed_formats: ['jpg', 'jpeg', 'png'], // Allowed formats
    }
});

const upload = multer({ storage: storage });

// Create a new movie
exports.addMovie = async (req, res) => {
    try {
        const data = req.body;
        console.log('Incoming data:', data);
        console.log('Uploaded file:', req.file); // Log the uploaded file

        // Ensure required fields are present
        if (!data.title || !data.language || !data.genre || !req.file) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Convert genre and language to arrays if they are not already
        const genreArray = Array.isArray(data.genre) ? data.genre : [data.genre];
        const languageArray = Array.isArray(data.language) ? data.language : [data.language];
        const subtitleArray = data.subtitle ? (Array.isArray(data.subtitle) ? data.subtitle : [data.subtitle]) : undefined;

        // Create a new movie object
        const newMovie = new MovieModel({
            title: data.title.trim(),
            language: languageArray, // Ensure language is an array
            genre: genreArray, // Ensure genre is an array
            isSubtitle: data.isSubtitle === 'true', // Convert to boolean
            subtitle: subtitleArray, // Set subtitle as an array or undefined
            description: data.description.trim(),
            poster: req.file.path, // Use Cloudinary URL as the poster path
        });

        await newMovie.save();
        res.status(201).json({ message: 'Movie added successfully', movie: newMovie });

    } catch (error) {
        console.error('Error adding movie:', error); // Log the error for debugging
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

        // Optionally trim string fields before updating
        if (updatedData.title) updatedData.title = updatedData.title.trim();
        if (updatedData.description) updatedData.description = updatedData.description.trim();

        // If there's a new poster file, upload it to Cloudinary
        if (req.file) {
            const uploadResponse = await cloudinary.uploader.upload(req.file.path, { folder: 'posters' });
            updatedData.poster = uploadResponse.secure_url; // Update with Cloudinary URL
        }

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

// Export the multer upload for use in routes
exports.upload = upload;
