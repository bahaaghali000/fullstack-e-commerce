const express = require("express");
const {
  createUser,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
  forgetPassword,
  verifyCode,
  restPassword,
  getProfile,
} = require("../controllers/user.controller");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/register").post(createUser);
router.route("/login").post(login);
router.route("/profile").get(protect, getProfile);
router.route("/all-users").get(protect, getAllUsers);
router.route("/:userId").put(updateUser).delete(protect, deleteUser);

router.route("/forget-password").post(forgetPassword);
router.route("/verify-code").post(verifyCode);
router.route("/rest-password/:restToken").patch(restPassword);

module.exports = router;
