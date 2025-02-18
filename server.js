const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const morgan = require("morgan");
const mainRouter = require("./routes/mainRouter");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios"); // Import axios

app.use(cors());

PORT = process.env.PORT;

require("./db/database");

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Secure CSP settings for Stripe & hCaptcha
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            scriptSrc: [
                "'self'",
                "https://js.stripe.com",
                "'unsafe-eval'", // Allow eval for Stripe.js
            ],
        },
    })
);

app.post("/apis/verify-captcha", async (req, res) => {
    const { hCaptchaToken } = req.body;

    console.log("Received hCaptcha Token:", hCaptchaToken);

    try {
        const response = await axios.post(
            "https://hcaptcha.com/siteverify",
            `secret=ES_70e56ba5c83a4c40b04832065d837f64&response=${hCaptchaToken}`,
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        console.log("hCaptcha API Response:", response.data);

        res.send({ success: response.data.success });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to verify captcha" });
    }
});

app.use("/", mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});