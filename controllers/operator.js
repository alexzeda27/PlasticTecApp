'use strict'

//Librerias

//Carga de Modelos
var Operator = require('../models/operator');

//Carga de Métodos
var Methods = require('../status/methods');

//Función Obtener Operador
function getOperator(req, res)
{
    var operatorId = req.params.id;
    Operator.findById(operatorId).populate({ path: "employee" }).exec((err, operators) => {
        if(err) return Methods.responseErrorServer(res);
        if(!operators) return Methods.responseNotFound(res, "No se ha encontrado el operador. Intentelo de nuevo.");
        else
        {
            return Methods.responseOk(res, operators);
        }
    });
}

//Función Obtener Operadores
function getOperators(req, res)
{
    Operator.find().populate({ path: "employee" }).exec((err, operators) => {
        if(err) return Methods.responseErrorServer(res);
        if(!operators) return Methods.responseNotAccepted(res, "No hay operadores.");
        else
        {
            return Methods.responseOk(res, operators);
        }
    });
}

//Función Actualizar Operadores

//Función Eliminar Operadores
function removeOperator(req, res)
{
    var operatorId = req.params.id;
    Operator.findByIdAndRemove(operatorId, (err, operatorRemoved) => {
        if(err) return Methods.responseErrorServer(res);
        if(!operatorRemoved) return Methods.responseNotAccepted(res, "Ocurrio un error al eliminar al operador. Intentelo de nuevo.");
        else
        {
            return Methods.responseOk(res, "Operador eliminado correctamente.");
        }
    });
}

//Exportar
module.exports = {
    getOperator,
    getOperators,
    removeOperator
}
