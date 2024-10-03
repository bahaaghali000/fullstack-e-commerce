const Joi = require("joi");
const AppError = require("../utils/AppError");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const signupSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const forgetPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
});

const verifyCodeSchema = Joi.object({
  verificationCode: Joi.string().length(4).required(),
});

const updatePasswordSchema = Joi.object({
  password: Joi.string().min(8).required(),
});

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

const signupValidation = (req, res, next) => {
  const { error } = signupSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

const forgetPasswordValidation = (req, res, next) => {
  const { error } = forgetPasswordSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

const verifyCodeValidation = (req, res, next) => {
  const { error } = verifyCodeSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

const updatePasswordValidation = (req, res, next) => {
  const { error } = updatePasswordSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

module.exports = {
  loginValidation,
  signupValidation,
  forgetPasswordValidation,
  verifyCodeValidation,
  updatePasswordValidation,
};
