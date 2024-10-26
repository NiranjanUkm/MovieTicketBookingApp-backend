const express = require('express')
const router = express.Router()

const asyncHandler = require('../../utils/asyncHandler');
const { addTheatre } = require('../../controllers/theatres/theatreController');
const authenticate = require('../../middleware/authenticate');

router.post('/addTheatre',authenticate, asyncHandler(addTheatre))

module.exports = router;

