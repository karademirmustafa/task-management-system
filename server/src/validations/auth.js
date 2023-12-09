const Joi = require("joi");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  name:Joi.string().required()
});
const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const authorizeSchema = Joi.object({
  userId: Joi.string().alphanum().length(24).required(),
  access: Joi.number().required(),
});
const revokeSchema = Joi.object({
  userId: Joi.string().alphanum().length(24).required(),
  access: Joi.number().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  authorizeSchema,
  revokeSchema,
};
