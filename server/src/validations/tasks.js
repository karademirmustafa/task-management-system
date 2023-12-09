const Joi = require("joi");

const insertSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  dueDate: Joi.date()
});

module.exports = {
    insertSchema,
};

