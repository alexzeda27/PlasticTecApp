'use strict'

//Librerias
var express = require('express');

//Controladores
var CostCenterController = require('../controllers/costCenter');

//Método Router
var api = express.Router();

//** TO DO Definir Métodos */
api.get('/consultar-centrosCosto', CostCenterController.getCostCenter);

//Exportar
module.exports = api;