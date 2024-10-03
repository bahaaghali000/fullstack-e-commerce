const express = require("express");
const router = express.Router();
const { makePayment } = require("../controllers/payment.controller");
const protect = require("../middlewares/auth.middleware");

router.post("/create-checkout-session", protect, makePayment);

module.exports = router;
