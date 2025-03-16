const Order = require("../../models/orderSchema");
const jsPDF = require("jspdf");

// 📌 Book a Movie Ticket
const createOrder = async (req, res) => {
  try {
    const { movieId, title, poster, seats, theater, date, slot } = req.body;

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Validate required fields
    if (!movieId || !title || !seats || !Array.isArray(seats) || seats.length === 0 || !theater || !date || !slot) {
      return res.status(400).json({
        success: false,
        message: "Missing or invalid required fields: movieId, title, seats, theater, date, slot",
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
      theater,
      date,
      slot,
      price: seats.length * 150, // Assuming 150 per seat
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

// 📌 Fetch Booked Seats for a Showtime
const getBookedSeats = async (req, res) => {
  try {
    const { movieId, date, theater, slot } = req.query;

    if (!movieId || !date || !theater || !slot) {
      return res.status(400).json({
        success: false,
        message: "Missing required query parameters: movieId, date, theater, slot",
      });
    }

    const orders = await Order.find({ movieId, date, theater, slot });
    const bookedSeats = orders.flatMap((order) => order.seats);

    res.json({ success: true, bookedSeats });
  } catch (err) {
    console.error("Error fetching booked seats:", err.stack || err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch booked seats",
      error: err.message || "Internal server error",
    });
  }
};

// 📌 Generate Ticket PDF
const getTicketPdf = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const order = await Order.findOne({ _id: orderId, userId: req.user.id });
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a5",
    });

    const width = pdf.internal.pageSize.getWidth();

    pdf.setFontSize(16);
    pdf.text("CineHub Ticket", width / 2, 20, { align: "center" });
    pdf.setFontSize(10);
    pdf.text(`#${order.movieId.slice(-6)}`, width / 2, 30, { align: "center" });

    pdf.addImage(order.poster, "JPEG", 15, 40, 50, 75); // Poster
    pdf.setFontSize(14);
    pdf.text(order.title, 70, 50);
    pdf.setFontSize(12);
    pdf.text(order.theater, 70, 60, { italic: true }); // Use theater ID (map in frontend)
    pdf.setFontSize(10);
    pdf.text(`Date: ${order.date}`, 70, 70); // Use date ID
    pdf.text(`Time: ${order.slot}`, 70, 80); // Use slot ID
    pdf.text(`Seats: ${order.seats.join(", ")}`, 70, 90);
    pdf.setFontSize(14);
    pdf.text(`₹${order.price || "N/A"}`, width / 2, 120, { align: "center" });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=CineHub-Ticket-${order.title}.pdf`);
    res.send(pdf.output());
  } catch (err) {
    console.error("Error generating ticket PDF:", err);
    res.status(500).json({ success: false, message: "Failed to generate ticket PDF" });
  }
};

module.exports = { createOrder, getUserOrders, deleteOrder, getTicketPdf, getBookedSeats };