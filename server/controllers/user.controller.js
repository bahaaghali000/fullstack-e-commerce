const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/email");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const createUser = asyncErrorHandler(async (req, res) => {
  const { username, email } = req.body;

  const isExist = await User.findOne({ $or: [{ email }, { username }] });

  if (isExist) {
    return res.status(400).json({
      status: "fail",
      message: "Username or Email are already exists!",
    });
  }

  const response = await fetch(
    `https://ipinfo.io/json?token=${process.env.IPINFO_TOKEN}`
  );
  const data = await response.json();

  const newUser = await User.create({ ...req.body, city: data.city });

  const token = generateToken(newUser._id);

  res.cookie("access_token", token, {
    maxAge: process.env.COOKIE_MAXAGE,
    secure: process.env.COOKIE_SECURE,
    httpOnly: true,
  });

  return res.status(200).json({ status: "success", data: newUser });
});

const login = asyncErrorHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      status: "fail",
      message: "Email is incorrect",
    });
  }

  const decodedPassword = await bcrypt.compare(password, user.password);

  const token = generateToken(user._id);

  if (!decodedPassword) {
    return res.status(400).json({
      status: "fail",
      message: "Password is incorrect",
    });
  }

  if (user && decodedPassword) {
    user.password = undefined;
    res.cookie("access_token", token, {
      maxAge: process.env.COOKIE_MAXAGE,
      secure: process.env.COOKIE_SECURE,
      httpOnly: true,
    });
    return res.status(200).json({
      status: "success",
      data: {
        user,
        token,
      },
    });
  }
});

const getProfile = asyncErrorHandler(async (req, res) => {
  return res.status(200).json({
    status: "success",
    data: req.user,
  });
});

const getAllUsers = asyncErrorHandler(async (req, res) => {
  let query = {
    $nor: [{ _id: req.user._id }],
  };
  if (req.query.search !== undefined) {
    query = {
      ...query,
      $or: [
        {
          username: {
            $regex: req.query.search,
            $options: "i",
          },
        },
        {
          email: {
            $regex: req.query.search,
            $options: "i",
          },
        },
      ],
    };
  }
  const users = await User.find(query);

  return res.status(200).json({ status: "success", data: users });
});

const updateUser = asyncErrorHandler(async (req, res) => {
  const { userId } = req.params;
  const { username, city, phoneNumber, bio, profilePic } = req.body;

  const isUsernameExsit = await User.findOne({ username });

  if (isUsernameExsit) {
    return res
      .status(400)
      .json({ status: "fail", message: "This username is already exsit" });
  }
  const result = profilePic ? await cloudinary.uploader.upload(profilePic) : "";

  const updatedUser = await User.findByIdAndUpdate(userId, {
    username,
    city,
    phoneNumber,
    bio,
    profilePic: result?.url,
  });
  const user = await User.findById(updatedUser._id).select("-password");

  if (!updatedUser) {
    return res
      .status(400)
      .json({ status: "fail", message: "user does not exist" });
  }

  res.status(200).json({ status: "success", data: user });
});

const deleteUser = asyncErrorHandler(async (req, res) => {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) {
    return res.status(404).json({ msg: "User doesn't exsit" });
  }
  res
    .status(200)
    .json({ status: "success", message: "user deleted successfully" });
});

const forgetPassword = asyncErrorHandler(async (req, res, next) => {
  // 1. get the user based on email
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({ message: "Email is incorrect" });
  }

  // 2. generate a random rest token
  const verificationCode = user.createVerificationCode();

  await user.save({ validateBeforeSave: false });

  const html = `
    <div>
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

    return next(new Error("there an error happend"));
  }
});

const verifyCode = asyncErrorHandler(async (req, res) => {
  const { verificationCode } = req.body;

  const user = await User.findOne({
    verificationCode,
    verificationCodeExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "Invaild verification code or expired",
    });
  }

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

const restPassword = asyncErrorHandler(async (req, res) => {
  const { restToken } = req.params;

  const token = crypto.createHash("sha256").update(restToken).digest("hex");

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(404).json({
      status: "fail",
      message: "something went wrong",
    });
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetTokenExpires = undefined;
  user.passwordChangedAt = Date.now();

  await user.save({ validateBeforeSave: false });
  return res.status(200).json({
    status: "success",
    message: "Password Changed Successfully",
  });
});

module.exports = {
  createUser,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
  forgetPassword,
  verifyCode,
  restPassword,
  getProfile,
};
