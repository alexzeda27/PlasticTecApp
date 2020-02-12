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
            if(squares && squares.length >= 1) return Methods.responseNotAccepted(res, "Este bloque ya existe. Intente con otro.");
            else
            {
                square.save((err, squareStored) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!squareStored) return Methods.responseNotAccepted(res, "Ocurrio un error al crear el bloque. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Bloque creado correctamente.");
                    }
                });
            }
        });
    }
    else
    {
        return Methods.responseNotAccepted("No puede dejar campos vacios en el formulario.");
    }
}

//Función Obtener Bloque
function getSquare(req, res)
{
    var squareId = req.params.id;
    Square.findById(squareId).populate({ path: "department" }).exec((err, squares) => {
        if(err) return Methods.responseErrorServer(res);
        if(!squares) return Methods.responseNotFound(res, "No se ha encontrado este bloque. Intente con otro.");
        else
        {
            return Methods.responseOk(res, squares);
        }
    });
}

//Función Obtener Bloques
function getSquares(req, res)
{
    Square.find().populate({ path: "department" }).exec((err, squares) => {
        if(err) return Methods.responseErrorServer(res);
        if(!squares) return Methods.responseNotFound(res, "No se han encontrado bloques.");
        else
        {
            return Methods.responseOk(res, squares);
        }
    });
}

//Función Actualizar Bloques
function updateSquare(req, res)
{
    var squareId = req.params.id;
    var update = req.body;
    if(update.numberSquare && update.department)
    {
        Square.find( {$and: [
            {numberSquare: update.numberSquare},
            {department: update.department}
        ]}).exec((err, squares) => {
            if(err) return Methods.responseErrorServer(res);
            if(squares && squares.length >= 1) return Methods.responseNotAccepted(res, "Este bloque ya existe. Intente con otro.");
            else
            {
                Square.findByIdAndUpdate(squareId, update, {new: true}, (err, squareUpdated) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!squareUpdated) return Methods.responseNotAccepted(res, "Ocurrio un error al actualizar el bloque. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Bloque actualizado con exito");
                    }                    
                });
            }
        });
    }
    else
    {
        return Methods.responseNotAccepted(res, "No puede dejar campos vacios en el formulario.");
    }
}

//Función Eliminar Bloques
function removeSquare(req, res)
{
    var squareId = req.params.id;
    Square.findOneAndRemove(squareId, (err, squareRemoved) => {
        if(err) return Methods.responseErrorServer(res);
        if(!squareRemoved) return Methods.responseNotAccepted(res, "Ocurrio un error al eliminar el bloque. Intentelo de nuevo.");
        else
        {
            return Methods.responseOk(res, "Bloque eliminado correctamente");
        }
    });
}

//Exportar
module.exports = {
    createSquare,
    getSquare,
    getSquares,
    updateSquare,
    removeSquare
}