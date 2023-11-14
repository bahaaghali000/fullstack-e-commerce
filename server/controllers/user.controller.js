const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const cloudinary = require("cloudinary").v2;

const createUser = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ msg: "all fields required" });
  }

  try {
    const isExist = await User.findOne({ email: email });
    if (isExist) {
      return res.status(400).json({ msg: "User is already exists!" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    res.status(200).json({ data: newUser, token });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "all fields required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .json({ status: "fail", msg: "User does not exist" });
    }

    const decodedPassword = await bcrypt.compare(password, user.password);

    const token = generateToken(user._id);

    if (user && decodedPassword) {
      return res
        .status(200)
        .json({ data: { ...user._doc, token: token }, status: "success" });
    } else {
      return res.status(200).json({
        status: "fail",
        msg: "Password is incorrect",
      });
    }
  } catch (error) {
    return res.status(400).json({
      msg: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  const users = await User.find({});

  try {
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(400).json({ msg: "something went wrong" });
  }
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { username, city, phoneNumber, bio, profilePic } = req.body;

  try {
    if (profilePic) {
      const result = await cloudinary.uploader.upload(profilePic);
      const updatedUser = await User.findByIdAndUpdate(userId, {
        username,
        city,
        phoneNumber,
        bio,
        profilePic: result.url,
      });
      const user = await User.findById(updatedUser._id).select("-password");

      if (!updatedUser) {
        return res.status(400).json({ msg: "user does not exist" });
      }
      const token = generateToken(user._id);

      res.status(200).json({ data: { ...user._doc, token: token } });
    } else {
      const updatedUser = await User.findByIdAndUpdate(userId, {
        username,
        city,
        phoneNumber,
        bio,
      });
      const user = await User.findById(updatedUser._id).select("-password");

      if (!updatedUser) {
        return res.status(400).json({ msg: "user does not exist" });
      }

      const token = generateToken(user._id);

      res.status(200).json({ data: { ...user._doc, token: token } });
    }
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(400).json({ msg: "User doesn't exsit" });
    }
    res.status(200).json({ msg: "user deleted successfully" });
  } catch (error) {
    return res.status(400).json({ msg: "something went wrong" });
  }
};

module.exports = { createUser, login, getAllUsers, updateUser, deleteUser };
