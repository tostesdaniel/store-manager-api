const validations = require('../validations/saleValidations');

const saleValidation = (req, _res, next) => {
  const sales = req.body;
  const input = sales.map((sale) => validations.createSale.validate(sale));
  let validSales = [...input];

  input.forEach((sale) => {
    if (sale.error) {
      validSales = { message: sale.error.details[0].message };
    }
  });

  return validSales.message ? next(validSales) : next();
};

module.exports = saleValidation;
