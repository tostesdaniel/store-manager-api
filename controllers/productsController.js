const productsService = require('../services/productsService');

const productsController = {
  getProducts: async (_req, res) => {
    const products = await productsService.getProducts();

    return res.status(200).json(products);
  },
  getProductById: async (req, res) => {
    const { id } = req.params;

    const product = await productsService.getProductById(id);

    if (product.error) {
      return res
        .status(product.error.code)
        .json({ message: product.error.message });
    }

    return res.status(200).json(product);
  },
};

module.exports = productsController;
