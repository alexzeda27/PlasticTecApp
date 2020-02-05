'use strict'

//Librerias
var express = require('express');

//Controladores
var DepartmentController = require('../controllers/department');

//Método Router
var api = express.Router();

//** TO DO Definir Métodos */
api.post('/crear-departamento', DepartmentController.createDepartment);
api.get('/consultar-departamento/:id', DepartmentController.getDepartment);
api.get('/consultar-departamentos', DepartmentController.getDepartments);
api.put('/actualizar-departamento/:id', DepartmentController.updateDepartment);
api.delete('/eliminar-departamento/:id', DepartmentController.removeDepartment);

//Exportar
module.exports = api;