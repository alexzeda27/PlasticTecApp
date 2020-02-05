'use strict'

//Librerias

//Carga de modelos
var Position = require('../models/position');

//Carga de métodos
var Methods = require('../status/methods');

//Función Crear Puesto
function createPosition(req, res)
{
    var params = req.body;
    var position = new Position();
    if(params.positionName && params.typeWorker && params.costCenter)
    {
        position.positionName = params.positionName;
        position.typeWorker = params.typeWorker;
        position.costCenter = params.costCenter;
        Position.find({positionName: position.positionName}, (err, positions) => {
            if(err) return Methods.responseErrorServer(res);
            if(positions && positions.length >= 1) return Methods.responseNotAccepted(res, "Este puesto ya existe. Intente con otro.");
            else
            {
                position.save((err, positionStored) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!positionStored) return Methods.responseNotAccepted(res, "Ocurrió un error al crear el puesto. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Puesto creado correctamente.");
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

//Función Obtener Puesto
function getPosition(req, res)
{
    var positionId = req.params.id;
    Position.findById(positionId).populate([{path: "typeWorker"}, {path: "costCenter"}]).exec((err, positions) => {
        if(err) return Methods.responseErrorServer(res);
        if(!positions) return Methods.responseNotFound(res, "No se ha encontrado este puesto. Intente con otro.");
        else
        {
            return Methods.responseOk(res, positions);
        }
    });
}

//Función Obtener Puestos
function getPositions(req, res)
{
    Position.find().populate([{path: "typeWorker"}, {path: "costCenter"}]).exec((err, positions) => {
        if(err) return Methods.responseErrorServer(res);
        if(!positions) return Methods.responseNotFound(res, "No se han encontrado puestos.");
        else
        {
            return Methods.responseOk(res, positions);
        }
    });
}

//Función Actualizar Puesto
function updatePosition(req, res)
{
    var positionId = req.params.id;
    var update = req.body;
    if(update.positionName && update.typeWorker && update.costCenter)
    {
        Position.find({positionName: update.positionName}, (err, positions) => {
            if(err) return Methods.responseErrorServer(res);
            if(positions && positions.length >= 1) return Methods.responseNotAccepted(res, "Este puesto ya existe. Intente con otro.");
            else
            {
                Position.findByIdAndUpdate(positionId, update, {new: true}, (err, positionUpdated) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!positionUpdated) return Methods.responseNotAccepted(res, "Ocurrió un error al actualizar el puesto. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Puesto actualizado correctamente.");
                    }
                })
            }
        });
    }
    else
    {
        return Methods.responseNotAccepted(res, "No puede dejar campos vacios en el formulario.");
    }
}

//Función Eliminar Puesto
function removePosition(req, res)
{
    var positionId = req.params.id;
    Position.findByIdAndRemove(positionId, (err, positionRemoved) => {
        if(err) return Methods.responseErrorServer(res);
        if(!positionRemoved) return Methods.responseNotAccepted(res, "Ocurrió un error al eliminar el puesto. Intentelo de nuevo.");
        else
        {
            return Methods.responseOk(res, "Puesto eliminado correctamente.");
        }
    });
}

//Exportar
module.exports = {
    createPosition,
    getPosition,
    getPositions,
    updatePosition,
    removePosition
}