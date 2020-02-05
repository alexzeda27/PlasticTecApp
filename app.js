'use strict'

//Librerias
var express = require('express');
var bodyParser = require('body-parser');

//Método de express
var app = express();

//** TO DO Cargar rutas */
var typeWorkerRoutes = require('./routes/typeWorker');
var costCenterRoutes = require('./routes/costCenter');
var departmentRoutes = require('./routes/department');
var positionRoutes = require('./routes/position');
var employeeRoutes = require('./routes/employee');

//Parseamos los datos por la URI
app.use(bodyParser.urlencoded({ extended: false }));
//Los codificamos como Json
app.use(bodyParser.json());

//** TO DO Definir Rutas */
app.use('/api', typeWorkerRoutes);
app.use('/api', costCenterRoutes);
app.use('/api', departmentRoutes);
app.use('/api', positionRoutes);
app.use('/api', employeeRoutes);

//Exportar
module.exports = app;