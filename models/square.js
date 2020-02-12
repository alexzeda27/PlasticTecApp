'use strict'

//Librerias
var mongoose = require('mongoose');

//Esquema del modelo
var Schema = mongoose.Schema;

//Modelo de Bloque
var SquareSchema = Schema({

    numberSquare: String,
    department: { type: Schema.ObjectId, ref: 'Department' }
});

//Exportar modelo
module.exports = mongoose.model('Square', SquareSchema);