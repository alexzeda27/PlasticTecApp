'use strict'

//Librerias
var express = require('express');

//Controladores
var CustomerController = require('../controllers/customer');

//Método Router
var api = express.Router();

//** TO DO Definir Métodos */
api.post('/crear-cliente', CustomerController.createCustomer);
api.get('/consultar-cliente/:id', CustomerController.getCustomer);
api.get('/consultar-clientes', CustomerController.getCustomers);
api.put('/actualizar-cliente/:id', CustomerController.updateCustomer);
api.delete('/eliminar-cliente/:id', CustomerController.removeCustomer);

//Exportar
module.exports = api;