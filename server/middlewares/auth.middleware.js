const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const AppError = require("../utils/AppError");

const protect = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) return next(new AppError("Invalid authorization", 401));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded.id);

  if (!user) return next(new AppError("User not found", 404));

  req.user = user;

  next();
};

module.exports = protect;
