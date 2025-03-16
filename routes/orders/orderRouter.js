const express = require("express");
const { createOrder, getUserOrders, deleteOrder, getTicketPdf, getBookedSeats } = require("../../controllers/orders/orderController");
const authenticate = require("../../middleware/authenticate");

const router = express.Router();

router.post("/createOrder", authenticate, createOrder); // POST /api/orders/createOrder
router.get("/getOrder", authenticate, getUserOrders);   // GET /api/orders/getOrder
router.delete("/:id", authenticate, deleteOrder);       // DELETE /api/orders/:id
router.get("/ticket/:orderId", getTicketPdf);           // GET /api/orders/ticket/:orderId
router.get("/seats", getBookedSeats);                   // GET /api/orders/seats?movieId=...&date=...&theater=...&slot=...

module.exports = router;