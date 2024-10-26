const express = require('express');
const multer = require('multer');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const { addMovie, getMovies, getMovieById, updateMovie, deleteMovie } = require('../../controllers/movies/movieController');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'C:/Users/Niranjan/Documents/STUDY/Entri/Capstone_Project/MovieTicketBooking/backend/assets/posters'); // Set your upload path
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use original file name
    }
});
const upload = multer({ storage: storage });

router.post('/addMovie', upload.single('poster'), asyncHandler(addMovie));
router.get('/getMovie', asyncHandler(getMovies));
router.get('/getMovieById/:id', asyncHandler(getMovieById));
router.patch('/updateMovie/:id', asyncHandler(updateMovie));
router.delete('/deleteMovie/:id', asyncHandler(deleteMovie));

module.exports = router;
