'use strict'

//Librerias
var mongoose = require('mongoose');

//Esquema del modelo
var Schema = mongoose.Schema;

//Modelo de Cliente
var OperatorSchema = Schema({

    employee: { type: Schema.ObjectId, ref: 'Employee' }
});

//Exportar modelo
module.exports = mongoose.model('Operator', OperatorSchema);