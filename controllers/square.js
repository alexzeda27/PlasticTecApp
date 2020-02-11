'use strict'

//Librerias

//Carga de Modelos
var Square = require('../models/square');

//Carga de Métodos
var Methods = require('../status/methods');

//Función Crear Bloques
function createSquare(req, res)
{
    var params = req.body;
    var square = new Square();
    if(params.numberSquare && params.department)
    {
        square.numberSquare = params.numberSquare;
        square.department = params.department;
        Square.find({ $and: [
            {numberSquare = square.numberSquare},
            {department : square.department}
        ]}).exec((err, squares) => {
            if(err) return Methods.responseErrorServer(res);
        })
    }
    else
    {
        return Methods.responseNotAccepted("No puede dejar campos vacios en el formulario.");
    }
}