const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const { addMovie, getMovies, getMovieById, updateMovie, deleteMovie, upload } = require('../../controllers/movies/movieController');

// Use Cloudinary upload middleware for adding and updating movies
router.post('/addMovie', upload.single('poster'), asyncHandler(addMovie));
router.get('/getMovie', asyncHandler(getMovies));
router.get('/getMovieById/:id', asyncHandler(getMovieById));
router.patch('/updateMovie/:id', upload.single('poster'), asyncHandler(updateMovie)); // Include poster upload for updates
router.delete('/deleteMovie/:id', asyncHandler(deleteMovie));

module.exports = router;
