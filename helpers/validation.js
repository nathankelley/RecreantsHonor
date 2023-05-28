const Joi = require('@hapi/joi');

const authSchema = Joi.object({
    name: Joi.string().required(),
    image: Joi.string(),
    description: Joi.string().required(),
    health_points: Joi.number().integer().positive().min(10).max(999).required(),
    item_drop_chance: Joi.number().positive().min(0.01).max(1.0).required(),
    undead_rating: Joi.string().length(1).trim().required(),
    item_drops: Joi.array().items(Joi.string())
});

module.exports = {
    authSchema
}