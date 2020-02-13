'use strict'

//Librerias
var express = require('express');

//Controladores
var SupervisorController = require('../controllers/supervisor');

//Método Router
var api = express.Router();

//** TO DO Definir Métodos */
api.get('/consultar-supervisor/:id', SupervisorController.getSupervisor);
api.get('/consultar-supervisores', SupervisorController.getSupervisors);
api.delete('/eliminar-supervisor/:id', SupervisorController.removeSupervisor);

//Exportar
module.exports = api;