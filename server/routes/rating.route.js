const express = require("express");
const protect = require("../middlewares/auth.middleware");
const {
  getRatings,
  addRating,
  updateRating,
  removeRating,
} = require("../controllers/rating.controller");
const {
  addRatingValidation,
  editRatingValidation,
} = require("../Validations/ratingSchema");

const router = express.Router();

router
  .route("/:productId")
  .get(getRatings)
  .post(protect, addRatingValidation, addRating);

router
  .route("/:ratingId")
  .patch(protect, editRatingValidation, updateRating)
  .delete(protect, removeRating);

module.exports = router;
