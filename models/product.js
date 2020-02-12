'use strict'

//Librerias
var mongoose = require('mongoose');

//Esquema del modelo
var Schema = mongoose.Schema;

//Modelo de Producto
var ProductSchema = Schema({

    productName: String,
    numberPart: String,
    version: String,
    customer: { type: Schema.ObjectId, ref: 'Customer' }
});

//Exportar modelo
module.exports = mongoose.model('Product', ProductSchema);