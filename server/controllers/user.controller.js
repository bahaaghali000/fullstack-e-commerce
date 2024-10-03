const User = require("../models/user.model");
const APIFeatures = require("../utils/APIFeatures");
const AppError = require("../utils/AppError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");

const getAllUsers = asyncErrorHandler(async (req, res) => {
  const searchRegex = new RegExp(req.query.search, "i");
  const searchArr = [
    { username: { $regex: searchRegex } },
    { email: { $regex: searchRegex } },
  ];

  const limit = parseInt(req.query.limit) || 5;

  const features = new APIFeatures(
    User.find({ $nor: [{ _id: req.user._id }] }),
    req.query
  )
    .filter(searchArr)
    .sort()
    .paginate()
    .limitFields();

  const users = await features.query;

  const totalUsers = await User.countDocuments({
    $nor: [{ _id: req.user._id }],
  });

  const totalPages = Math.ceil(totalUsers / limit);

  return res
    .status(200)
    .json({ status: "success", data: { users, totalUsers, totalPages } });
});

const updateUser = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params;

  const isUsernameExsit = await User.findOne({ username: req.body.username });

  if (isUsernameExsit && req.user.username !== req.body.username)
    return next(new AppError("This username is already exsit", 400));

  const updatedUser = await User.findByIdAndUpdate(userId, {
    ...req.body,
    profilePic: req?.file?.path,
  });

  const user = await User.findById(updatedUser._id);

  if (!updatedUser) {
    return res
      .status(400)
      .json({ status: "fail", message: "user does not exist" });
  }

  res.status(200).json({ status: "success", data: user });
});

const deleteUser = asyncErrorHandler(async (req, res, next) => {
  const { userId } = req.params;

  const deletedUser = await User.findByIdAndDelete(userId);

  if (!deletedUser) return next(new AppError("User doesn't exsit", 404));

  res
    .status(200)
    .json({ status: "success", message: "User deleted successfully" });
});

const checkUsernameExsit = asyncErrorHandler(async (req, res, next) => {
  const { username } = req.query;

  const isExist = await User.findOne({ username });

  if (isExist && req.user.username !== username)
    return res.status(200).json({
      available: false,
      status: "fail",
      message: "username already exists",
    });

  return res.status(200).json({
    available: true,
    status: "success",
    message: "You can use this username",
  });
});

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  checkUsernameExsit,
};
