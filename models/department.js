'use strict'

//Librerias
var mongoose = require('mongoose');

//Esquema del modelo
var Schema = mongoose.Schema;

//Modelo de Departamento
var DepartmentSchema = Schema({

    departmentName: String
});

//Exportar modelo
module.exports = mongoose.model('Department', DepartmentSchema);