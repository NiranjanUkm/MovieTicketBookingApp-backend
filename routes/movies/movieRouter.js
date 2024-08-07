const express = require('express')
const router = express.Router()

const asyncHandler = require('../../utils/asyncHandler');
const { addMovie, getMovies, getMovieById, updateMovie, deleteMovie } = require('../../controllers/movies/movieController');

router.post('/addMovie',asyncHandler(addMovie));
router.get('/getMovie',asyncHandler(getMovies));
router.get('/getMovieById/:id',asyncHandler(getMovieById));
router.patch('/updateMovie/:id',asyncHandler(updateMovie));
router.delete('/deleteMovie/:id',asyncHandler(deleteMovie));


module.exports = router;

