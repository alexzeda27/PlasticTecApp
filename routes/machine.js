'use strict'

//Librerias
var express = require('express');

//Controladores
var MachineController = require('../controllers/machine');

//Método Router
var api = express.Router();

//** TO DO Definir Métodos */
api.post('/crear-maquina', MachineController.createMachine);
api.get('/consultar-maquina/:id', MachineController.getMachine);
api.get('/consultar-maquinas', MachineController.getMachines);
api.put('/actualizar-maquina/:id', MachineController.updateMachine);
api.delete('/eliminar-maquina/:id', MachineController.removeMachine);

//Exportar
module.exports = api;