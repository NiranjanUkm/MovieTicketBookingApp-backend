const express = require('express')
const router = express.Router()

const asyncHandler = require('../../utils/asyncHandler');
const { updateProfile } = require('../../controllers/users/profileUserController');

router.put('/updateProfile',asyncHandler(updateProfile))

module.exports = router;

