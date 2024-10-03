const Product = require("../models/product.model");
const Rating = require("../models/rating.model");
const AppError = require("../utils/AppError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const getRatings = asyncErrorHandler(async (req, res) => {
  const { productId } = req.params;

  const ratings = await Rating.find({ productId }).populate({
    path: "author",
    select: "username email profilePic",
  });

  return res.status(200).json({ status: "success", data: ratings });
});

const addRating = asyncErrorHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  const product = await Product.findById(productId);

  if (!product) return next(new AppError("Product not found", 404));

  await Rating.create({
    productId: product._id,
    author: req.user._id,
    rating,
    comment,
  });

  res.status(200).json({
    status: "success",
    message: "Your Rating Added Successfully",
  });
});

const updateRating = asyncErrorHandler(async (req, res, next) => {
  const { ratingId } = req.params;

  const rating = await Rating.findOneAndUpdate(
    { _id: ratingId, author: req.user._id },
    req.body
  );

  if (!rating)
    return next(new AppError("You didn't have permission to do that", 400));

  res
    .status(200)
    .json({ status: "success", message: "Rating Updated Successfully" });
});

const removeRating = asyncErrorHandler(async (req, res, next) => {
  const { ratingId } = req.params;

  const rating = await Rating.findByIdAndDelete(ratingId);

  if (!rating) return next(new AppError("Rating not found", 404));

  return res
    .status(200)
    .json({ status: "success", message: "Rating deleted successfully" });
});

module.exports = {
  getRatings,
  addRating,
  updateRating,
  removeRating,
};
