const express = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.get('/', productsController.getProducts);

productsRouter.get('/:id', productsController.getProductById);

productsRouter.post('/', productsController.create);

productsRouter.put('/:id', productsController.update);

module.exports = productsRouter;
