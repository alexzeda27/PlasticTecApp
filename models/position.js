'use strict'

//Librerias
var mongoose = require('mongoose');

//Esquema del modelo
var Schema = mongoose.Schema;

//Modelo de Puesto
var PositionSchema = Schema({

    positionName: String,
    typeWorker: { type: Schema.ObjectId, ref: 'TypeWorker'},
    costCenter: { type: Schema.ObjectId, ref: 'CostCenter'}
});

//Exportar modelo
module.exports = mongoose.model('Position', PositionSchema);