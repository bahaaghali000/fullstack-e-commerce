const Category = require("../models/category.model");
const AppError = require("../utils/AppError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const getCategories = asyncErrorHandler(async (req, res) => {
  const categories = await Category.find().populate({
    path: "products",
    select: "productName price imgUrl quantity",
  });

  return res.status(200).json({ status: "success", data: categories });
});

const createCategory = asyncErrorHandler(async (req, res) => {
  const category = await Category.create(req.body);

  return res.status(200).json({
    status: "success",
    data: category,
    message: "Category is Added Successfully",
  });
});

const editCategory = asyncErrorHandler(async (req, res, next) => {
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.categoryId,
    req.body
  );

  if (!updatedCategory) return next(new AppError("Category not found", 404));

  return res.status(200).json({
    status: "success",
    message: "Category updated successfully",
  });
});

const deleteCategory = asyncErrorHandler(async (req, res) => {
  await Category.findByIdAndDelete(req.params.categoryId);

  res
    .status(200)
    .json({ status: "success", message: "Category deleted successfully" });
});

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  editCategory,
};
