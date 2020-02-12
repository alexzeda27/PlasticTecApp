'use strict'

//Librerias
var mongoose = require('mongoose');

//Esquema del modelo
var Schema = mongoose.Schema;

//Modelo de Máquina
var MachineSchema = Schema({

    numberMachine: String,
    square: { type: Schema.ObjectId, ref: 'Square' }
});

//Exportar modelo
module.exports = mongoose.model('Machine', MachineSchema);