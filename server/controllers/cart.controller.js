const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const AppError = require("../utils/AppError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const getCart = asyncErrorHandler(async (req, res, next) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate({
    path: "items.product",
    select: "productName price imgUrl quantity",
  });

  if (!cart) {
    return res.status(200).json({
      status: "success",
      data: {
        items: [],
        totalAmount: 0,
        totalQuantity: 0,
      },
    });
  }

  res.status(200).json({ status: "success", data: cart });
});

const addToCart = asyncErrorHandler(async (req, res, next) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) return next(new AppError("Product not found", 404));

  let cart = await Cart.findOne({ userId: req.user._id });

  if (cart) {
    // check if the product already exsit
    let item = cart.items.find(
      (item) => item.product.toString() === product._id.toString()
    );

    if (!item) {
      cart.items.push({
        product: productId,
        quantity: 1,
      });
      cart.totalQuantity++;
      cart.totalAmount += +product.price;
    } else {
      item.quantity++;
      cart.totalAmount += +product.price;
    }

    await cart.save();

    return res.status(201).json({
      status: "success",
      message: "product is added to cart successfully",
      cart,
    });
  }

  const newCart = new Cart({
    userId: req.user._id,
    items: [
      {
        product: product._id,
        quantity: 1,
      },
    ],
    totalQuantity: 1,
    totalAmount: product.price,
  });

  await newCart.save();

  return res.status(201).json({
    status: "success",
    message: "product is added to cart successfully",
    cart: newCart,
  });
});

const removeFromCart = asyncErrorHandler(async (req, res, next) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user._id });

  const product = await Product.findById(productId);

  if (!product) return next(new AppError("Product not found", 404));

  const productIndex = cart.items.findIndex(
    (p) => p.product.toString() == productId
  );

  if (productIndex <= -1) {
    return res
      .status(404)
      .json({ status: "fail", message: "Product not found" });
  }

  const removedItem = cart.items[productIndex];
  cart.items.splice(productIndex, 1);

  cart.totalQuantity -= removedItem.quantity;
  cart.totalAmount -= removedItem.quantity * product.price;

  await cart.save();

  return res.status(200).json({
    status: "success",
    message: "product is removed from cart successfully",
    cart,
  });
});

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};
