'use strict'

//Librerias
var express = require('express');

//Controladores
var PositionController = require('../controllers/position');

//Método Router
var api = express.Router();

//** TO DO Definir Métodos */
api.post('/crear-puesto', PositionController.createPosition);
api.get('/consultar-puesto/:id', PositionController.getPosition);
api.get('/consultar-puestos', PositionController.getPositions);
api.put('/actualizar-puesto/:id', PositionController.updatePosition);
api.delete('/eliminar-puesto/:id', PositionController.removePosition);

//Exportar
module.exports = api;