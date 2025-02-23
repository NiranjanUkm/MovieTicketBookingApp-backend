const Order = require("../../models/orderSchema");

// 📌 Book a Movie Ticket
const createOrder = async (req, res) => {
  try {
    const { movieId, title, poster, seats } = req.body;

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Validate required fields
    if (!movieId || !title || !seats || !Array.isArray(seats) || seats.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid required fields: movieId, title, seats",
      });
    }

    console.log("Request body:", req.body); // Debug: Check incoming data
    console.log("User:", req.user); // Debug: Check authenticated user

    const userId = req.user.id;
    const bookingDate = new Date();

    const newOrder = new Order({
      userId,
      movieId,
      title,
      poster: poster || "/images/placeholder.jpg",
      seats,
      bookingDate,
    });

    await newOrder.save();
    console.log("Order saved:", newOrder);

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (err) {
    console.error("Error placing order:", err.stack || err); // Log full stack trace
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: err.message || "Internal server error",
    });
  }
};

// 📌 Fetch All Orders of a User
const getUserOrders = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userId = req.user.id;
    const orders = await Order.find({ userId }).sort({ bookingDate: -1 });

    res.json({ success: true, orders });
  } catch (err) {
    console.error("Error fetching orders:", err.stack || err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: err.message || "Internal server error",
    });
  }
};

// 📌 Cancel an Order
const deleteOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const orderId = req.params.id;
    const userId = req.user.id;

    const order = await Order.findOneAndDelete({ _id: orderId, userId });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found or not authorized to delete",
      });
    }

    console.log("Order cancelled:", order);
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully!",
      orderId,
    });
  } catch (err) {
    console.error("Error cancelling order:", err.stack || err);
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: err.message || "Internal server error",
    });
  }
};

module.exports = { createOrder, getUserOrders, deleteOrder };