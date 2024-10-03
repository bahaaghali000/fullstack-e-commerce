const Favorite = require("../models/favorite.model");
const Product = require("../models/product.model");
const AppError = require("../utils/AppError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const getFav = asyncErrorHandler(async (req, res) => {
  const fav = await Favorite.findOne({ userId: req.user._id }).populate({
    path: "items",
    select: "productName price imgUrl quantity",
  });

  if (!fav) {
    return res.status(200).json({
      status: "success",
      data: {
        items: [],
        totalQuantity: 0,
        totalAmount: 0,
      },
    });
  }

  res.status(200).json({ status: "success", data: fav });
});

const addOrDeleteProduct = asyncErrorHandler(async (req, res, next) => {
  const { productId } = req.params;

  const fav = await Favorite.findOne({ userId: req.user._id });
  const product = await Product.findById(productId);

  if (!product) return next(new AppError("Product not found", 404));

  if (fav) {
    const productIndex = fav.items.findIndex(
      (p) => p.toString() === product._id.toString()
    );

    if (productIndex === -1) {
      // Add product to favorites
      fav.items.push(product._id);
      fav.totalQuantity++;
      fav.totalAmount += +product.price;

      await fav.save();

      return res.status(200).json({
        status: "success",
        message: "Product added to favorites successfully",
      });
    } else {
      // Remove product from favorites
      fav.items.splice(productIndex, 1);
      fav.totalQuantity--;
      fav.totalAmount -= +product.price;
      await fav.save();

      return res.status(200).json({
        status: "success",
        message: "Product removed from favorites successfully",
      });
    }
  }

  const newFav = new Favorite({
    userId: req.user._id,
    items: [product._id],
    totalQuantity: 1,
    totalAmount: +product.price,
  });
  await newFav.save();

  return res.status(201).json({
    status: "success",
    message: "Product added to favorites successfully",
  });
});

module.exports = {
  addOrDeleteProduct,
  getFav,
};
