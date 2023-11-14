const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require("../controllers/product.controller");

const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/create-product").post(protect, createProduct);
router.route("/all-products").get(getAllProducts);
router.route("/:productId").get(getProduct);
router.route("/:productId").put(protect, updateProduct);
router.route("/:productId").delete(protect, deleteProduct);

module.exports = router;
