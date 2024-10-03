const Joi = require("joi");
const AppError = require("../utils/AppError");

const addCategorySchema = Joi.object({
  categoryName: Joi.string().min(2).max(50).required(),
});

const editCategorySchema = Joi.object({
  categoryName: Joi.string().min(2).max(50),
});

const addCategoryValidation = (req, res, next) => {
  const { error } = addCategorySchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

const editCategoryValidation = (req, res, next) => {
  const { error } = editCategorySchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

module.exports = { addCategoryValidation, editCategoryValidation };
