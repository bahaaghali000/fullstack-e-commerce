const jwt = require("jsonwebtoken");

const User = require("../models/user.model");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const protect = asyncErrorHandler(async (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Please Login to Access",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // create user object in req object
  req.user = await User.findById(decoded.id).select("-password");

  next();
});

module.exports = protect;
