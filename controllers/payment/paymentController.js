const Stripe = require("stripe");
const dotenv = require("dotenv");

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createStripeSession = async (req, res) => {
  try {
    const { movieId, movieTitle, theatre, date, time, seats, totalAmount, poster } = req.body;

    console.log("Received payment payload:", req.body);

    if (!movieId || !movieTitle || !seats) {
      return res.status(400).json({ error: "Missing required fields: movieId, movieTitle, seats" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: `${movieTitle} - ${theatre}`,
              description: `Date: ${date}, Time: ${time}, Seats: ${seats.join(", ")}`,
            },
            unit_amount: totalAmount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/payment-failed`,
      metadata: {
        movieId,
        movieTitle,
        theatre,
        date,
        time,
        seats: JSON.stringify(seats),
        totalAmount,
        poster, // Save poster in metadata
      },
    });

    console.log("Stripe session created with metadata:", session.metadata);

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Payment failed. Please try again." });
  }
};

const getStripeSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    console.log("Retrieved session metadata:", session.metadata);
    res.json({ metadata: session.metadata });
  } catch (error) {
    console.error("Error retrieving session:", error);
    res.status(500).json({ error: "Failed to retrieve payment session" });
  }
};

module.exports = { createStripeSession, getStripeSession };