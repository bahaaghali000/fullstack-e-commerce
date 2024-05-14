const express = require("express");
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../controllers/cart.controller");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/add/:productId").get(protect, addToCart);
router.route("/get/").get(protect, getCart);
router.route("/remove/:productId").delete(protect, removeFromCart);

module.exports = router;
