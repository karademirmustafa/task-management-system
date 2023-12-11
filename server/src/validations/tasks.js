const Joi = require("joi");

const insertSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  dueDate: Joi.date(),
});
const updateSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  status: Joi.string(),
  dueDate: Joi.date().allow(null),
  assignedTo:Joi.string().alphanum().length(24)
});


module.exports = {
  insertSchema,
  updateSchema
};
