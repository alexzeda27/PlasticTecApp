'use strict'

//Librerias
var mongoose = require('mongoose');

//Esquema del modelo
var Schema = mongoose.Schema;

//Modelo de Cliente
var CustomerSchema = Schema({

    customerName: String
});

//Exportar modelo
module.exports = mongoose.model('Customer', CustomerSchema);