const Product = require("../models/product.model");
const Rating = require("../models/rating.model");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const getRatings = asyncErrorHandler(async (req, res) => {
  const { productId } = req.params;
  const ratings = await Rating.find({ productId }).populate({
    path: "author",
    select: "-password -bio -city -phoneNumber",
  });
  return res.status(200).json({ status: "success", data: ratings });
});

const addRating = asyncErrorHandler(async (req, res) => {
  const { productId } = req.params;
  const { rating, comment } = req.body;

  const product = await Product.findById(productId);

  if (!product) {
    return res
      .status(404)
      .json({ status: "fail", message: "Product not found" });
  }

  const newRating = new Rating({
    productId: product._id,
    author: req.user._id,
    rating,
    comment,
  });
  const ratingForResponse = await newRating.save();
  return res.status(200).json({
    status: "success",
    data: { ...ratingForResponse._doc, author: req.user },
  });
});

const updateRating = asyncErrorHandler(async (req, res) => {
  const { productId } = req.params;

  const rating = await Rating.findOne({ productId, author: req.user._id });

  if (!rating) {
    return res.status(400).json({
      status: "fail",
      message: "You don't have permission to do that",
    });
  }

  await Rating.findOneAndUpdate({ productId, author: req.user._id }, req.body);

  return res
    .status(200)
    .json({ status: "success", message: "Updated Successfully" });
});

module.exports = {
  getRatings,
  addRating,
  updateRating,
};
