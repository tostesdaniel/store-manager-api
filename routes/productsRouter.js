const express = require('express');
const productsController = require('../controllers/productsController');

const productsRouter = express.Router();

productsRouter.post('/', productsController.create);

productsRouter.get('/', productsController.getProducts);

productsRouter.get('/:id', productsController.getProductById);

productsRouter.put('/:id', productsController.update);

productsRouter.delete('/:id', productsController.delete);

module.exports = productsRouter;
