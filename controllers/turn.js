'use strict'

//Librerias

//Carga de modelos
var Turn = require('../models/turn');

//Carga de métodos
var Methods = require('../status/methods');

//Función Obtener Semana
function getTurns(req, res)
{
    Turn.find((err, turns) => {
        if(err) return Methods.responseErrorServer(res);
        if(!turns) return Methods.responseNotFound(res, "No se han encontrado turnos.");
        else
        {
            return Methods.responseOk(res, turns);
        }
    });
}

//Exportar
module.exports = {
    getTurns
}