const express = require("express");
const { createStripeSession, getStripeSession } = require("../../controllers/payment/paymentController");

const router = express.Router();

router.post("/create-session", createStripeSession);
router.get("/session/:sessionId", getStripeSession); // New route to fetch session details

module.exports = router;