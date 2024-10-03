const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
  getRelatedProducts,
  getTrendingProducts,
  getBestSalesProducts,
  getMostViewedProductsByCategory,
} = require("../controllers/product.controller");
const {
  addProductValidation,
  editProductValidation,
} = require("../Validations/productSchema");
const protect = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/restrictTo");
const isMightAuthenticated = require("../middlewares/isMightAuthenticated");
const upload = require("../middlewares/storge");

const router = express.Router();

router.route("/trending-products").get(getTrendingProducts, getAllProducts);
router.route("/best-sales").get(getBestSalesProducts, getAllProducts);
router.route("/most-viewed-products").get(getMostViewedProductsByCategory);

router.route("/").get(getAllProducts).post(
  protect,
  restrictTo("admin"),
  // addProductValidation,
  upload.single("productImage"),
  createProduct
);
router
  .route("/:productId")
  .get(isMightAuthenticated, getProduct)
  .patch(
    protect,
    restrictTo("admin"),
    editProductValidation,
    upload.single("productImage"),
    updateProduct
  )
  .delete(protect, restrictTo("admin"), deleteProduct);

router.route("/:productId/related-products").get(getRelatedProducts);

module.exports = router;
