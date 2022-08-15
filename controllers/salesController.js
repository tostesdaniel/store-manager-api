const salesService = require('../services/salesService');

const salesController = {
  create: async (req, res, next) => {
    const sales = req.body;

    const response = await salesService.create(sales);

    if (response.message) return next(response);

    return res.status(201).json(response);
  },
};

module.exports = salesController;
