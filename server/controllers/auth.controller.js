const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/email");
const User = require("../models/user.model");
const crypto = require("crypto");
const AppError = require("../utils/AppError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const bcrypt = require("bcrypt");

const cookieOptions = {
  sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
  maxAge: process.env.COOKIE_MAXAGE,
  secure: process.env.NODE_ENV === "production",
  httpOnly: true,
};

const generateRandomUsername = async () => {
  let username;
  let existingUser;
  do {
    // Generate a random username
    username = "user-" + Math.floor(Math.random() * 10000);
    // Check if the username already exists in the database
    existingUser = await User.findOne({ username });
    // If the username exists, generate a new one
  } while (existingUser);
  return username;
};

const createUser = asyncErrorHandler(async (req, res, next) => {
  const { username, email } = req.body;

  const isExist = await User.findOne({ $or: [{ email }, { username }] });

  if (isExist)
    return next(new AppError("Username or Email are already exists!", 400));

  const response = await fetch(
    `https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`
  );

  const data = await response.json();

  const newUser = await User.create({
    ...req.body,
    city: data.city,
    country: data.country,
  });

  const token = generateToken(newUser._id);

  res.cookie("access_token", token, cookieOptions);

  return res.status(200).json({ status: "success", data: { user: newUser } });
});

const getProfile = asyncErrorHandler(async (req, res) => {
  return res.status(200).json({
    status: "success",
    data: req.user,
  });
});

const login = asyncErrorHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return next(new AppError("User Not Found", 404));

  const isMatch = await user.comparePassword(password, user.password);

  if (!isMatch)
    return next(new AppError("Email or Password are incorrect", 400));

  const token = generateToken(user._id);

  res.cookie("access_token", token, cookieOptions);

  return res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

const forgetPassword = asyncErrorHandler(async (req, res, next) => {
  // 1. get the user based on email
  const user = await User.findOne({ email: req.body.email });

  if (!user) return next(new AppError("Email is incorrect", 404));

  // 2. generate a random rest token
  const verificationCode = user.createVerificationCode();

  await user.save({ validateBeforeSave: false });

  const html = `
      <div>
       <h1>Hi ${user.username}</h1>
        <h1>This Email From Multimart E-commerce</h1>
        <h3>your rest verfication Code is => 
          <span style="font-weight: bold;">${verificationCode}</span>
        </h3>
      </div>
    `;

  // 3. send the token to user email
  try {
    await sendEmail({
      to: user.email,
      subject: "Rest your password",
      html,
    });

    res.status(200).json({
      status: "success",
      message: "Your rest verfication Code sent successfully",
    });
  } catch (error) {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;

    user.save({ validateBeforeSave: false });

    return next(new AppError("there an error happend", 500));
  }
});

const verifyCode = asyncErrorHandler(async (req, res, next) => {
  const { verificationCode } = req.body;

  const user = await User.findOne({
    verificationCode,
    verificationCodeExpires: { $gt: Date.now() },
  });

  if (!user)
    return next(new AppError("Invaild verification code or expired", 400));

  const restToken = user.createRestToken();

  user.verificationCodeExpires = undefined;
  user.verificationCode = undefined;

  await user.save();

  return res.status(200).json({
    status: "success",
    message: "Verification Code is correct",
    restPasswordToken: restToken,
  });
});

const restPassword = asyncErrorHandler(async (req, res, next) => {
  const { restToken } = req.params;

  const token = crypto.createHash("sha256").update(restToken).digest("hex");

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) return next(new AppError("Something went wrong", 404));

  user.password = await bcrypt.hash(req.body.password, 10);
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.passwordChangedAt = Date.now();

  await user.save({ validateBeforeSave: false });

  return res.status(200).json({
    status: "success",
    message: "Password Changed Successfully",
  });
});

const continueWithGoogle = asyncErrorHandler(async (req, res, next) => {
  if (!req.user) return next(new AppError("Not Authorized", 400));

  let user;

  const exsitUser = await User.findOne({
    $or: [{ googleId: req.user.id }, { email: req.user.emails[0].value }],
  });

  if (exsitUser) {
    user = exsitUser;
  } else {
    const randomUsername = await generateRandomUsername();

    const response = await fetch(
      `https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`
    );

    const data = await response.json();

    user = new User({
      username: randomUsername,
      email: req.user.emails[0].value,
      profilePic: req.user.photos[0].value,
      googleId: req.user.id,
      city: data.city,
      country: data.country,
    });

    await user.save({ validateBeforeSave: false });
  }

  const token = generateToken(user._id);

  res.cookie("access_token", token, cookieOptions);

  res.redirect(process.env.FRONTEND_BASE_URL);
});

module.exports = {
  createUser,
  login,
  forgetPassword,
  verifyCode,
  restPassword,
  getProfile,
  continueWithGoogle,
};
