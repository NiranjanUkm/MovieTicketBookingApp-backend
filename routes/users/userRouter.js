const express = require('express')
const router = express.Router()

const asyncHandler = require('../../utils/asyncHandler');
const { addUsers } = require('../../controllers/users/userController');

router.post('/',asyncHandler(addUsers))

module.exports = router;

