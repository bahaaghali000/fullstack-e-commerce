const express = require("express");
const protect = require("../middlewares/auth.middleware");
const { getRatings, addRating,updateRating } = require("../controllers/rating.controller");

const router = express.Router();

router.route("/:productId").get(getRatings).post(protect, addRating).patch(protect, updateRating);

module.exports = router;
