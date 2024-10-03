const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const isMightAuthenticated = async (req, res, next) => {
  const token = req.cookies.access_token;

  if (token) {
    const decodedData = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decodedData.id);

    req.user = user;
  }

  next();
};

module.exports = isMightAuthenticated;
