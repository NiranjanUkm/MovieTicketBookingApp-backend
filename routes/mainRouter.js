const express = require('express');
const router = express.Router();
const movieRouter = require('./movies/movieRouter');
const authUserRouter = require('./users/authUserRouter');
const profileUserRouter = require('./users/profileUserRouter');
const cityRouter = require('./cities/cityRouter');
const theatreRouter = require('./theatres/theatreRouter');
const paymentRouter = require('./payment/paymentRouter');
const orderRouter = require('./orders/orderRouter')

router.use('/movies', movieRouter);
router.use('/users', authUserRouter, profileUserRouter);
router.use('/cities', cityRouter);
router.use('/theatres', theatreRouter);
router.use("/api/payments", paymentRouter);
router.use("/api/orders", orderRouter);


// Centralized error handling for unhandled routes
router.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

module.exports = router;
