'use strict'

//Librerias
var express = require('express');

//Controladores
var TypeWorkerController = require('../controllers/typeWorker');

//Método Router
var api = express.Router();

//** TO DO Definir Métodos */
api.get('/consultar-tipoTrabajadores', TypeWorkerController.getTypeWorkers);

//Exportar
module.exports = api;