'use strict'

//Librerias

//Carga de modelos
var CostCenter = require('../models/costCenter');

//Carga de métodos
var Methods = require('../status/methods');

//Función Obtener Tipo Trabajador
function getCostCenter(req, res)
{
    CostCenter.find((err, costCenters) => {
        if(err) return Methods.responseErrorServer(res);
        if(!costCenters) return Methods.responseNotFound(res, "No se han encontrado centros de costo.");
        else
        {
            return Methods.responseOk(res, costCenters);
        }
    });
}

//Exportar
module.exports = {
    getCostCenter
}