const passwordValidation = require('joi-password-complexity');
const Joi = require('@hapi/joi');

module.exports.authSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    description: Joi.string().required(),
    health_points: Joi.number().integer().positive().min(10).max(999).required(),
    item_drop_chance: Joi.number().positive().min(0.01).max(1.0).required(),
    undead_rating: Joi.string().length(1).trim().required(),
    item_drops: Joi.array().items(Joi.string())
});

const complexity = {
    min: 8,
    max: 26,
    lowerCase: 1,
    upperCase: 1,
    numeric: 1,
    symbol: 1,
    requirementCount: 4
}

module.exports.passwordPass = (passwordToCheck) => {
    return passwordValidation(complexity, 'Password').validate(passwordToCheck);
}