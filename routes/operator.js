'use strict'

//Librerias
var express = require('express');

//Controladores
var OperatorController = require('../controllers/operator');

//Método Router
var api = express.Router();

//** TO DO Definir Métodos */
api.get('/consultar-operador/:id', OperatorController.getOperator);
api.get('/consultar-operadores', OperatorController.getOperators);
api.delete('/eliminar-operador/:id', OperatorController.removeOperator);

//Exportar
module.exports = api;