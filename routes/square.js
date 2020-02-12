'use strict'

//Librerias
var express = require('express');

//Controladores
var SquareController = require('../controllers/square');

//Método Router
var api = express.Router();

//** TO DO Definir Métodos */
api.post('/crear-bloque', SquareController.createSquare);
api.get('/consultar-bloque/:id', SquareController.getSquare);
api.get('/consultar-bloques', SquareController.getSquares);
api.put('/actualizar-bloque/:id', SquareController.updateSquare);
api.delete('eliminar-bloque/:id', SquareController.removeSquare);

//Exportar
module.exports = api;