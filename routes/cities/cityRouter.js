const express = require('express')
const router = express.Router()

const asyncHandler = require('../../utils/asyncHandler');
const { addCity, getCities, getCityById, updateCity, deleteCity } = require('../../controllers/cities/cityController');

router.post('/addCity',asyncHandler(addCity));
router.get('/getCity',asyncHandler(getCities));
router.get('/getCityById/:id',asyncHandler(getCityById));
router.patch('/updateCity/:id',asyncHandler(updateCity));
router.delete('/deleteCity/:id',asyncHandler(deleteCity));


module.exports = router;

