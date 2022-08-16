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
  get: async () => {
    const sales = await salesModel.get();

    return sales;
  },
  getById: async (saleId) => {
    const sales = await salesModel.getById(saleId);

    if (!sales.length) return { message: 'Sale not found|404' };

    return sales;
  },
  delete: async (id) => {
    await salesModel.delete(id);

    const sale = await salesModel.getById(id);

    if (!sale.length) return { message: 'Sale not found|404' };

    return true;
  },
};

module.exports = salesService;
