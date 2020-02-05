'use strict'

//Librerias
var mongoose = require('mongoose');

//Esquema del modelo
var Schema = mongoose.Schema;

//Modelo de Tipo de Trabajador
var TypeWorkerSchema = Schema({

    type: String
});

//Exportar modelo
module.exports = mongoose.model('TypeWorker', TypeWorkerSchema);
