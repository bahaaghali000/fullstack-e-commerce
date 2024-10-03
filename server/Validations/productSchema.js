const Joi = require("joi");
const AppError = require("../utils/AppError");

const addProdcutSchema = Joi.object({
  productName: Joi.string().min(4).required(),
  description: Joi.string().min(3).max(525).required(),
  shortDesc: Joi.string().min(8).max(250).required(),
  price: Joi.number().positive().required(),
  quantity: Joi.number().positive().required(),
  category: Joi.string().required(),
  productImage: Joi.string().required(),
});

const editProductSchema = Joi.object({
  productName: Joi.string().min(4),
  description: Joi.string().min(3).max(525),
  shortDesc: Joi.string().min(8).max(250),
  price: Joi.number().positive(),
  quantity: Joi.number().positive(),
  category: Joi.string(),
  productImage: Joi.string(),
});

const addProductValidation = (req, res, next) => {
  const { error } = addProdcutSchema.validate({ ...req.body });
  if (error) return next(new AppError(error.message, 400));
  next();
};

const editProductValidation = (req, res, next) => {
  const { error } = editProductSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

module.exports = { addProductValidation, editProductValidation };
