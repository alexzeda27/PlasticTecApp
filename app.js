'use strict'

//Librerias
var express = require('express');
var bodyParser = require('body-parser');

//Método de express
var app = express();

//** TO DO Cargar rutas */
var monthRoutes = require('./routes/month');
var weekRoutes = require('./routes/week');
var dayRoutes = require('./routes/day');
var typeWorkerRoutes = require('./routes/typeWorker');
var costCenterRoutes = require('./routes/costCenter');
var departmentRoutes = require('./routes/department');
var positionRoutes = require('./routes/position');
var employeeRoutes = require('./routes/employee');
var customerRoutes = require('./routes/customer');
var squareRoutes = require('./routes/square');
var machineRoutes = require('./routes/machine');
var productRoutes = require('./routes/product');
var operatorRoutes = require('./routes/operator');
var mobilityDateRoutes = require('./routes/mobilityDate');

//Parseamos los datos por la URI
app.use(bodyParser.urlencoded({ extended: false }));
//Los codificamos como Json
app.use(bodyParser.json());

//** TO DO Definir Rutas */
app.use('/api', monthRoutes);
app.use('/api', weekRoutes);
app.use('/api', dayRoutes);
app.use('/api', typeWorkerRoutes);
app.use('/api', costCenterRoutes);
app.use('/api', departmentRoutes);
app.use('/api', positionRoutes);
app.use('/api', employeeRoutes);
app.use('/api', customerRoutes);
app.use('/api', squareRoutes);
app.use('/api', machineRoutes);
app.use('/api', productRoutes);
app.use('/api', operatorRoutes);
app.use('/api', mobilityDateRoutes);

//Exportar
module.exports = app;