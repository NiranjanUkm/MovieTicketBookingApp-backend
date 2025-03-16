const express = require('express');
const router = express.Router();

const asyncHandler = require('../../utils/asyncHandler');
const { register, login, getAllUsers, toggleUserStatus } = require('../../controllers/users/authUserController');
const authenticate = require('../../middleware/authenticate');

router.post('/register', asyncHandler(register));
router.post('/login', asyncHandler(login));
router.get('/all', authenticate, getAllUsers);
router.put('/:userId/toggle', authenticate, toggleUserStatus);

module.exports = router;