'use strict'

//Librerias
var express = require('express');

//Controladores
var ProductController = require('../controllers/product');

//Método Router
var api = express.Router();

//** TO DO Definir Métodos */
api.post('/crear-producto', ProductController.createProduct);
api.get('/consultar-producto/:id', ProductController.getProduct);
api.get('/consultar-productos', ProductController.getProducts);
api.put('/actualizar-producto/:id', ProductController.updateProduct);
api.delete('/eliminar-producto/:id', ProductController.removeProduct);

//Exportar
module.exports = api;