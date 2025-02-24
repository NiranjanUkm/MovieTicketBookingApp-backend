const express = require("express");
const { createOrder, getUserOrders, deleteOrder, getTicketPdf} = require("../../controllers/orders/orderController");
const authenticate = require("../../middleware/authenticate");

const router = express.Router();

router.post("/createOrder", authenticate, createOrder); // POST /api/orders/createOrder
router.get("/getOrder", authenticate, getUserOrders);   // GET /api/orders/getOrder
router.delete("/:id", authenticate, deleteOrder);       // DELETE /api/orders/:id
router.get("/ticket/:orderId", getTicketPdf); // New route

module.exports = router;