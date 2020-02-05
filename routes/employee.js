'use strict'

//Librerias
var express = require('express');

//Controladores
var EmployeeController = require('../controllers/employee');

//Método Router
var api = express.Router();

//** TO DO Definir Métodos */
api.post('/crear-empleado', EmployeeController.createEmployee);
api.get('/consultar-empleado/:id', EmployeeController.getEmployee);
api.get('/consultar-empleados', EmployeeController.getEmployees);
api.put('/actualizar-empleado/:id', EmployeeController.updateEmployees);
api.delete('/eliminar-empleado/:id', EmployeeController.removeEmployee);

//Exportar
module.exports = api;