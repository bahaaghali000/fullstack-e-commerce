const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_BASE_URL,
    failureRedirect: process.env.FRONTEND_LOGIN_URL,
  })
);

router.get("/logout", (req, res) => {
  res.clearCookie("access_token");
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect(process.env.FRONTEND_BASE_URL);
  });
});

const generateRandomUsername = async () => {
  let username;
  let existingUser;
  do {
    // Generate a random username
    username = "user" + Math.floor(Math.random() * 10000);
    // Check if the username already exists in the database
    existingUser = await User.findOne({ username });
    // If the username exists, generate a new one
  } while (existingUser);
  return username;
};

router.get("/login/success", async (req, res) => {
  if (!req.user) {
    return res.status(400).json({ status: "fail", message: "Not Authorized" });
  }

  const exsitUser = await User.findOne({
    $or: [{ googleId: req.user.id }, { email: req.user.emails[0].value }],
  });
  if (exsitUser) {
    exsitUser.password = undefined;

    const token = generateToken(exsitUser._id);

    res.cookie("access_token", token, {
      sameSite: process.env.SAME_SITE_TYPE_COOKIE,
      maxAge: process.env.COOKIE_MAXAGE,
      secure: process.env.COOKIE_SECURE,
      httpOnly: true,
    });

    return res.status(200).json({
      status: "success",
      data: exsitUser,
    });
  }

  const randomUsername = await generateRandomUsername();

  const user = new User({
    username: randomUsername,
    email: req.user.emails[0].value,
    profilePic: req.user.photos[0].value,
    googleId: req.user.id,
  });

  await user.save({ validateBeforeSave: false });

  const token = generateToken(user._id);

  res.cookie("access_token", token, {
    sameSite: process.env.SAME_SITE_TYPE_COOKIE,
    maxAge: process.env.COOKIE_MAXAGE,
    secure: process.env.COOKIE_SECURE,
    httpOnly: true,
  });

  return res.status(200).json({
    status: "success",
    data: user,
  });
});

module.exports = router;
