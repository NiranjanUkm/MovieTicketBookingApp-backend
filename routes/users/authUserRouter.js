const express = require('express')
const router = express.Router()

const asyncHandler = require('../../utils/asyncHandler');
const { register, login } = require('../../controllers/users/authUserController');

router.post('/register',asyncHandler(register))
router.post('/login',asyncHandler(login))

module.exports = router;

