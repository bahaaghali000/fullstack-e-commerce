const Order = require("../models/order.model");
const Product = require("../models/product.model");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

const handleOrder = async (session, user, requestBody) => {
  const totalAmount = session.amount_total / 100;

  const newOrder = new Order({
    sessionId: session.id,
    user: user._id,
    items: requestBody.map((item) => ({
      productId: item.product._id,
      quantity: item.quantity,
    })),
    totalAmount,
    totalQuantity: requestBody.length,
    paymentMethod: session.payment_method_types[0],
    status: "Processing",
  });

  await newOrder.save();

  // decrease the product quantity
  await Promise.all(
    requestBody.map(async (item) => {
      const product = await Product.findById(item.product._id);
      product.quantity -= item.quantity;
      await product.save();
    })
  );
};

const makePayment = asyncErrorHandler(async (req, res, next) => {
  const lineItems = await Promise.all(
    req.body.map(async (item) => {
      const product = await Product.findById(item.product._id);
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.productName,
          },
          unit_amount: product.price * 100,
        },
        quantity: item.quantity,
      };
    })
  );

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    customer_email: req.user.email,
    line_items: lineItems,

    success_url: process.env.FRONTEND_BASE_URL,
    cancel_url: process.env.FRONTEND_BASE_URL,
  });

  await handleOrder(session, req.user, req.body);
  res.json({ url: session.url });
});

module.exports = { makePayment };
