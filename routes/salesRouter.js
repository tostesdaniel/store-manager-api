const express = require('express');
const salesController = require('../controllers/salesController');
const saleValidation = require('../middlewares/saleValidation');

const salesRouter = express.Router();

salesRouter.post('/', saleValidation, salesController.create);

salesRouter.get('/', salesController.get);

salesRouter.get('/:id', salesController.getById);

salesRouter.delete('/:id', salesController.delete);

module.exports = salesRouter;
