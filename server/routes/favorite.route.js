const express = require("express");
const protect = require("../middlewares/auth.middleware");
const {
  addOrDeleteProduct,
  getFav,
} = require("../controllers/favorite.controller");

const router = express.Router();

router.route("/").get(protect, getFav);
router.route("/:productId").get(protect, addOrDeleteProduct);

module.exports = router;
