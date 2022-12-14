const Joi = require('joi');

const schema = {
  createProduct: Joi.object({
    name: Joi.string().min(5).required().messages({
      'string.min': '"name" length must be at least 5 characters long|422',
      'any.required': '"name" is required|400',
    }),
  }),
  updateProduct: Joi.object({
    name: Joi.string().min(5).required().messages({
      'string.min': '"name" length must be at least 5 characters long|422',
      'any.required': '"name" is required|400',
    }),
  }),
};

module.exports = schema;
