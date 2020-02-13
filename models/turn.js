'use strict'

//Librerias
var mongoose = require('mongoose');

//Esquema del modelo
var Schema = mongoose.Schema;

//Modelo de Turno
var TurnSchema = Schema({

    turn: String
});

//Exportar modelo
module.exports = mongoose.model('Turn', TurnSchema);