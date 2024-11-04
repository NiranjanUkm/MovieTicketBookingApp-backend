const express = require('express')
const router = express.Router()

const asyncHandler = require('../../utils/asyncHandler');
const { addTheatre, getTheatre } = require('../../controllers/theatres/theatreController');
const authenticate = require('../../middleware/authenticate');

router.post('/addTheatre',authenticate, asyncHandler(addTheatre))
router.get('/getTheatre',authenticate, asyncHandler(getTheatre))


module.exports = router;

