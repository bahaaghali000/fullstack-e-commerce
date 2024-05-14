const Cart = require("../models/cart.model");
const Product = require("../models/product.model");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const getCart = asyncErrorHandler(async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user._id }).populate({
    path: "items.product",
    select: "-description -shortDesc", // Exclude these fields from items.product
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

const addToCart = asyncErrorHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  let cart = await Cart.findOne({ userId: req.user._id });

  if (cart) {
    // check if the product already exsit
    let item = cart.items.find((item) => item.product === productId);

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
    });
  } else {
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
    });
  }
});

const removeFromCart = asyncErrorHandler(async (req, res) => {
  const { productId } = req.params;

  const cart = await Cart.findOne({ userId: req.user._id });

  const product = await Product.findById(productId);

  const productIndex = cart.items.findIndex((p) => p.product == productId);

  if (productIndex <= -1) {
    return res
      .status(404)
      .json({ status: "fail", message: "Product not found" });
  }
  cart.items.splice(productIndex, 1);
  cart.totalQuantity--;
  cart.totalAmount -= +product.price;

  await cart.save();

  return res.status(200).json({
    status: "success",
    message: "product is removed from cart successfully",
  });
});

module.exports = {
  addToCart,
  getCart,
  removeFromCart,
};
