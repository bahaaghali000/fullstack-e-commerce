const express = require("express");
const {
  createUser,
  login,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");
const protect = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/regesiter").post(createUser);
router.route("/login").post(login);
router.route("/all-users").get(protect, getAllUsers);
router.route("/:userId").put(updateUser);
router.route("/:userId").delete(protect, deleteUser);

module.exports = router;
