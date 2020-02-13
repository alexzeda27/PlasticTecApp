'use strict'

//Librerias
var mongoose = require('mongoose');

//Esquema del modelo
var Schema = mongoose.Schema;

//Modelo de Movilidad
var MobilitySchema = Schema({

    mobilityDate: { type: Schema.ObjectId, ref: 'MobilityDate' },
    department: { type: Schema.ObjectId, ref: 'Department' },
    square: { type: Schema.ObjectId, ref: 'Square' },
    machine: { type: Schema.ObjectId, ref: 'Machine' },
    operator: { type: Schema.ObjectId, ref: 'Operator' },
    product: { type: Schema.ObjectId, ref: 'Product' },
    indicator: String,
    observations: String
});

//Exportar modelo
module.exports = mongoose.model('Mobilitie', MobilitySchema);