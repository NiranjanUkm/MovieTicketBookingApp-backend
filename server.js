const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config({ path: "./config/.env" });
const morgan = require("morgan");
const mainRouter = require("./routes/mainRouter");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios");

const PORT = process.env.PORT || 4001; // Fallback port if not set in env

// CORS configuration with dynamic origin
const allowedOrigins = [
  // process.env.FRONTEND_URL ||  // Fallback to localhost for dev
  "http://localhost:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., Postman) or if origin is in allowed list
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials (JWT tokens via Authorization header)
  })
);

// Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Secure CSP settings for Stripe & hCaptcha
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      scriptSrc: [
        "'self'",
        "https://js.stripe.com",
        "'unsafe-eval'",
        "https://vercel.live", // Add this if you want Vercel's feedback widget
      ],
    },
  })
);

// Database connection
require("./db/database");

// Routes
app.use("/", mainRouter);

// Optional hCaptcha endpoint (uncomment if needed)
// app.post("/apis/verify-captcha", async (req, res) => {
//   const { hCaptchaToken } = req.body;

//   console.log("Received hCaptcha Token:", hCaptchaToken);

//   try {
//     const response = await axios.post(
//       "https://hcaptcha.com/siteverify",
//       `secret=${process.env.HCAPTCHA_SECRET}&response=${hCaptchaToken}`, // Use env var for secret
//       { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
//     );

//     console.log("hCaptcha API Response:", response.data);
//     res.send({ success: response.data.success });
//   } catch (error) {
//     console.error("hCaptcha Error:", error);
//     res.status(500).send({ error: "Failed to verify captcha" });
//   }
// });

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});