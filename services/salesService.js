const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const salesService = {
  create: async (sales) => {
    const products = await Promise.all(
      sales.map(({ productId: id }) => productsModel.getProductById(id)),
    );
    const invalidProducts = products.some(
      (product) => Array.isArray(product) && !product.length,
    );

    if (invalidProducts) return { message: 'Product not found|404' };

    const saleId = await salesModel.create();
    await Promise.all(
      sales.map(({ productId, quantity }) =>
        salesModel.createLink(saleId, productId, quantity)),
    );

    return {
      id: saleId,
      itemsSold: sales,
    };
  },
};

module.exports = salesService;
