const Joi = require('@hapi/joi');

const userSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    city: Joi.string().min(3).max(30).required(),
    age: Joi.number().integer().min(1).max(100).required(),
    isActive: Joi.boolean().required(),
    roles: Joi.array().items(Joi.string()).required()
});

module.exports = { userSchema };