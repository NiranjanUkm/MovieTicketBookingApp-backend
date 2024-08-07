const express = require('express')
const router = express.Router()
const movieRouter = require('./movies/movieRouter')
const userRouter = require('./users/userRouter')
const cityRouter = require('./cities/cityRouter')
const theatreRouter = require('./theatres/theatreRouter')

router.use('/movies',movieRouter)
router.use('/users',userRouter)
router.use('/cities',cityRouter)
router.use('/theatres',theatreRouter)


module.exports = router;