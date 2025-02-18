const express = require("express");
const { createStripeSession } = require("../../controllers/payment/paymentController");

const router = express.Router();

router.post("/create-session", createStripeSession);

module.exports = router;
