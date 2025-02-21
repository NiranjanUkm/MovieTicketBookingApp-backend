const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    movieId: { type: String, required: true },
    title: { type: String, required: true },
    poster: { type: String, required: true },
    bookingDate: { type: Date, default: Date.now },
    seats: { type: [String], required: true } // Changed from Number to [String]
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;