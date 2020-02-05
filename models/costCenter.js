'use strict'

//Librerias
var mongoose = require('mongoose');

//Esquema del modelo
var Schema = mongoose.Schema;

//Modelo de Centro de Costos
var CostCenterSchema = Schema({

    center: String
});

//Exportar modelo
module.exports = mongoose.model('CostCenter', CostCenterSchema);