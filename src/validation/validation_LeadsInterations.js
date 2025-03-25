const Joi = require('@hapi/joi');

const interationSchema = Joi.object({
    type: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(3).max(100).required(),
    interation_date: Joi.date().required(),
    owner: Joi.string().min(3).max(30).required(),
});

module.exports = { interationSchema };