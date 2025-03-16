const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    poster: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
    seats: { type: [String], required: true },
    theater: { type: String, required: true }, // e.g., "theater-125"
    date: { type: String, required: true },    // e.g., "date-123"
    slot: { type: String, required: true },    // e.g., "slot-323"
    price: { type: Number, default: 0 },       // Total amount
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;