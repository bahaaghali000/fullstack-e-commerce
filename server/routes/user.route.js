const express = require("express");
const {
  getAllUsers,
  updateUser,
  deleteUser,
  checkUsernameExsit,
} = require("../controllers/user.controller");
const {
  createUser,
  login,
  forgetPassword,
  verifyCode,
  restPassword,
  getProfile,
} = require("../controllers/auth.controller");
const {
  signupValidation,
  loginValidation,
  forgetPasswordValidation,
  verifyCodeValidation,
  updatePasswordValidation,
} = require("../Validations/authSchema");
const protect = require("../middlewares/auth.middleware");
const restrictTo = require("../middlewares/restrictTo");
const upload = require("../middlewares/storge");

const router = express.Router();

router.route("/").get(protect, getAllUsers);
router.route("/register").post(signupValidation, createUser);
router.route("/login").post(loginValidation, login);
router.route("/profile").get(protect, getProfile);
router.route("/forget-password").post(forgetPasswordValidation, forgetPassword);
router.route("/verify-code").post(verifyCodeValidation, verifyCode);
router
  .route("/rest-password/:restToken")
  .patch(updatePasswordValidation, restPassword);

router
  .route("/:userId")
  .patch(protect, upload.single("profilePicture"), updateUser)
  .delete(protect, restrictTo("admin"), deleteUser);

router.route("/check-username").get(protect, checkUsernameExsit);

module.exports = router;
