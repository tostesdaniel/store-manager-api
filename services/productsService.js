const productsModel = require('../models/productsModel');
const validations = require('./validations/productValidations');

const productsService = {
  getProducts: async () => {
    const products = await productsModel.getProducts();

    return products;
  },
  getProductById: async (id) => {
    const [product] = await productsModel.getProductById(id);

    if (!product) {
      return {
        error: {
          code: 404,
          message: 'Product not found',
        },
      };
    }

    return product;
  },
  create: async (newProduct) => {
    const input = validations.createProduct.validate(newProduct);

    if (input.error) {
      return { message: input.error.details[0].message };
    }

    const product = await productsModel.create(newProduct);

    return product;
  },
  update: async (productId, productData) => {
    const idIsValid = await productsModel.getProductById(productId);

    if (!idIsValid.length) return { message: 'Product not found' };

    const product = await productsModel.update(productId, productData);

    return product;
  },
};

module.exports = productsService;
