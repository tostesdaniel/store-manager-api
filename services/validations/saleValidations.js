const Joi = require('joi');

const schema = {
  createSale: Joi.object({
    productId: Joi.number().required().messages({
      'any.required': '"productId" is required|400',
    }),
    quantity: Joi.number().min(1).required().messages({
      'number.min': '"quantity" must be greater than or equal to 1|422',
      'any.required': '"quantity" is required|400',
    }),
  }),
};

module.exports = schema;
