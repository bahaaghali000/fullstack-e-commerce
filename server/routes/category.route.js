const express = require("express");
const router = express.Router();
const {
  getCategories,
  createCategory,
  deleteCategory,
  editCategory,
} = require("../controllers/category.controller");
const protect = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/restrictTo");
const {
  addCategoryValidation,
  editCategoryValidation,
} = require("../Validations/categorySchema");

router
  .route("/")
  .get(getCategories)
  .post(protect, restrictTo("admin"), addCategoryValidation, createCategory);

router
  .route("/:categoryId")
  .patch(protect, restrictTo("admin"), editCategoryValidation, editCategory)
  .delete(protect, restrictTo("admin"), deleteCategory);

module.exports = router;
