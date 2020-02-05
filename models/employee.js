'use strict'

//Librerias
var mongoose = require('mongoose');

//Esquema del modelo
var Schema = mongoose.Schema;

//Modelo de Empleado
var EmployeeSchema = Schema({

    payroll: String,
    name: String,
    surnameP: String,
    surnameM: String,
    username: String,
    email: String,
    password: String,
    position: { type: Schema.ObjectId, ref: 'Position' },
    department: { type: Schema.ObjectId, ref: 'Department' } 
});

//Exportar modelo
module.exports = mongoose.model('Employee', EmployeeSchema);