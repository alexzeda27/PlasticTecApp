'use strict'

//Librerias
var mongoose = require('mongoose');

//Carga de archivos
var app = require('./app');

//Reservación de puerto
var port = 4000;

//Promesa a la base de datos
mongoose.Promise = global.Promise;

//Cadena de conexión 
mongoose.connect('mongodb://localhost:27017/plasticTec', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false })

        //Si no existe algún error
        .then(() => {
            console.log('Se ha conectado a la base de datos correctamente');

            //Conectamos nuestro servidor al puerto indicado
            app.listen(port, () => {
                console.log('Se ha conectado al servidor correctamente')
            });
        })
        //Capturamos el error y lo mostramos por consola
        .catch(err => console.log(err));