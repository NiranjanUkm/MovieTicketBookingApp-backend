const Order = require('../../models/orderSchema');

// 📌 Book a Movie Ticket
const createOrder = async (req, res) => {
  try {
    const { movieId, title, poster, seats } = req.body;

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
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
      seats, // Now an array of strings
      bookingDate,
    });

    await newOrder.save();
    console.log("Order saved:", newOrder); // Debug: Confirm save

    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      order: newOrder,
    });
  } catch (err) {
    console.error("Error placing order:", err);
    res.status(500).json({
      success: false,
      message: "Failed to place order",
      error: err.message || err,
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
    console.error("Error fetching orders:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: err.message || err,
    });
  }
};


// ... existing createOrder and getUserOrders ...

// 📌 Cancel an Order
const deleteOrder = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const orderId = req.params.id;
    const userId = req.user.id;

    // Find and delete the order if it belongs to the user
    const order = await Order.findOneAndDelete({ _id: orderId, userId });
    
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found or not authorized to delete" });
    }

    console.log("Order cancelled:", order);
    res.status(200).json({
      success: true,
      message: "Order cancelled successfully!",
      orderId,
    });
  } catch (err) {
    console.error("Error cancelling order:", err);
    res.status(500).json({
      success: false,
      message: "Failed to cancel order",
      error: err.message || err,
    });
  }
};

module.exports = { createOrder, getUserOrders, deleteOrder };