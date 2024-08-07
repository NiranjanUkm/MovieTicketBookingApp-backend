const express = require('express')
const router = express.Router()

const asyncHandler = require('../../utils/asyncHandler');
const { addTheatre } = require('../../controllers/theatres/theatreController');

router.post('/',asyncHandler(addTheatre))

module.exports = router;

