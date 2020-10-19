const Joi = require('@hapi/joi');

const postValidation = {
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  subscription: Joi.string().valid('free', 'pro', 'premium'),
  password: Joi.string().min(6),
  token: Joi.string().empty(''),
};

const createValidation = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  name: Joi.string(),
  phone: Joi.string().empty(''),
};

const loginValidation = {
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
};

const updateValidation = {
  email: Joi.string().email().required(),
  subscription: Joi.string().valid('free', 'pro', 'premium').required(),
};

const patchValidation = {
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  subscription: Joi.string().valid('free', 'pro', 'premium'),
  password: Joi.string().min(6),
  token: Joi.string().empty(''),
};

module.exports = {
  createValidation,
  loginValidation,
  patchValidation,
  postValidation,
  updateValidation,
};
