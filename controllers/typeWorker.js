'use strict'

//Librerias

//Carga de modelos
var TypeWorker = require('../models/typeWorker');

//Carga de métodos
var Methods = require('../status/methods');

//Función Obtener Tipo Trabajador
function getTypeWorkers(req, res)
{
    TypeWorker.find((err, typeWorkers) => {
        if(err) return Methods.responseErrorServer(res);
        if(!typeWorkers) return Methods.responseNotFound(res, "No se han encontrado tipos de trabajador.");
        else
        {
            return Methods.responseOk(res, typeWorkers);
        }
    });
}

//Exportar
module.exports = {
    getTypeWorkers
}