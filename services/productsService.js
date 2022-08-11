const productsModel = require('../models/productsModel');

const productsService = {
  getProducts: async () => {
    const products = await productsModel.getProducts();

    return products;
  },
  getProductById: async (id) => {
    const product = await productsModel.getProductById(id);

    if (Array.isArray(product) && !product.length) {
      return {
        error: {
          code: 404,
          message: 'Product not found',
        },
      };
    }

    return product;
  },
};

module.exports = productsService;
