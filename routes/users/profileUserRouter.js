const express = require('express');
const router = express.Router();
const asyncHandler = require('../../utils/asyncHandler');
const authenticate = require('../../middleware/authenticate'); // Ensure authentication middleware is included
const { getProfile, updateProfile } = require('../../controllers/users/profileUserController');

router.get('/getProfile', authenticate, asyncHandler(getProfile));  // Apply authentication middleware
router.put('/updateProfile', authenticate, asyncHandler(updateProfile));

module.exports = router;
