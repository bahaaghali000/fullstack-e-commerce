const Joi = require("joi");
const AppError = require("../utils/AppError");

const addRatingSchema = Joi.object({
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().min(3).max(500).required(),
});

const editRatingSchema = Joi.object({
  rating: Joi.number().min(1).max(5),
  comment: Joi.string().min(3).max(500),
});

const addRatingValidation = (req, res, next) => {
  const { error } = addRatingSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

const editRatingValidation = (req, res, next) => {
  const { error } = editRatingSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

module.exports = { addRatingValidation, editRatingValidation };
