const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // create user object in req object
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }

    if (!token) {
      res.status(401).json({ msg: "invaild token" });
    }
  }
};

module.exports = protect;
