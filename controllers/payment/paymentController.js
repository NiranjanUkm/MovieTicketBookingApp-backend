const Stripe = require("stripe");
const dotenv = require("dotenv");

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createStripeSession = async (req, res) => {
  try {
    const { selectedSeats, movieId, theatreId, slot, date, totalAmount } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Movie Ticket",
              description: `Seats: ${selectedSeats.join(", ")}, Date: ${date}, Slot: ${slot}`,
            },
            unit_amount: 150 * 100, // Convert ₹150 to paise
          },
          quantity: selectedSeats.length,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:5173/payment-success",
      cancel_url: "http://localhost:5173/payment-failed",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Payment failed. Please try again." });
  }
};

module.exports = { createStripeSession };
