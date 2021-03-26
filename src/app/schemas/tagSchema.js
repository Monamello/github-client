const Joi = require('joi');

const tagSchema = Joi.object({
  name: Joi.string()
      .required(),
});

module.exports = tagSchema;

