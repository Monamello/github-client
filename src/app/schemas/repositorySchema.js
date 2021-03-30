const Joi = require('joi');

const tagSchema = Joi.object({
    name: Joi.string()
        .required(),
    id_repository: Joi.number()
        .required(),
    description: Joi.string(),
    url: Joi.string()
        .required(),
    tags: Joi.array().items(Joi.object()),
});

module.exports = tagSchema;

