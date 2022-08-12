const productsService = require('../services/productsService');

const productsController = {
  getProducts: async (_req, res) => {
    const products = await productsService.getProducts();

    return res.status(200).json(products);
  },
  getProductById: async (req, res) => {
    const { id } = req.params;

    const product = await productsService.getProductById(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    return res.status(200).json(product);
  },
};

module.exports = productsController;
