// validations/eventValidation.js
const Joi = require('joi');

const eventValidationSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  date: Joi.string().required(),
  location: Joi.string().required(),
  price: Joi.number().positive().required(),
  seats: Joi.number().integer().positive().required(),
  category: Joi.string().required(),
});

const validateEvent = (data) => eventValidationSchema.validate(data);

module.exports = validateEvent;
