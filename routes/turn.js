'use strict'

//Librerias
var express = require('express');

//Controladores
var TurnController = require('../controllers/turn');

//Método Router
var api = express.Router();

//** TO DO Definir Métodos */
api.get('/consultar-turnos', TurnController.getTurns);

//Exportar
module.exports = api;