const salesService = require('../services/salesService');

const salesController = {
  create: async (req, res, next) => {
    const sales = req.body;

    const response = await salesService.create(sales);

    if (response.message) return next(response);

    return res.status(201).json(response);
  },
  get: async (_req, res) => {
    const response = await salesService.get();

    return res.status(200).json(response);
  },
  getById: async (req, res, next) => {
    const { id } = req.params;

    const response = await salesService.getById(id);

    if (response.message) return next(response);

    return res.status(200).json(response);
  },
  delete: async (req, res, next) => {
    const { id } = req.params;

    const response = await salesService.delete(id);

    if (response.message) return next(response);

    return res.status(204).end();
  },
};

module.exports = salesController;
