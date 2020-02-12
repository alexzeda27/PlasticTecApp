'use strict'

//Librerias

//Carga de Modelos
var Machine = require('../models/machine');

//Carga de Métodos
var Methods = require('../status/methods');

//Función Crear Máquinas
function createMachine(req, res)
{
    var params = req.body;
    var machine = new Machine();
    if(params.numberMachine && params.square)
    {
        machine.numberMachine = params.numberMachine;
        machine.square = params.square;
        Machine.find({ $and: [
            {numberMachine: machine.numberMachine},
            {square: machine.square}
        ]}).exec((err, machines) => {
            if(err) return Methods.responseErrorServer(res);
            if(machines && machines.length >= 1) return Methods.responseNotAccepted(res, "Esta máquina ya existe. Intente con otro.");
            else
            {
                machine.save((err, machineStored) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!machineStored) return Methods.responseNotAccepted(res, "Ocurrio un error al crear la máquina. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Máquina creada correctamente.");
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

//Función Obtener Máquina
function getMachine(req, res)
{
    var machineId = req.params.id;
    Machine.findById(machineId).populate({ path: "square", populate: [{ path: "department" }]}).exec((err, machines) => {
        if(err) return Methods.responseErrorServer(res);
        if(!machines) return Methods.responseNotFound(res, "No se ha encontrado esta máquina. Intente con otro.");
        else
        {
            return Methods.responseOk(res, machines);
        }
    });
}

//Función Obtener Máquinas
function getMachines(req, res)
{
    Machine.find().populate({ path: "square", populate: [{ path: "department" }]}).exec((err, machines) => {
        if(err) return Methods.responseErrorServer(res);
        if(!machines) return Methods.responseNotFound(res, "No se han encontrado maquinas.");
        else
        {
            return Methods.responseOk(res, machines);
        }
    });
}

//Función Actualizar Máquina
function updateMachine(req, res)
{
    var machineId = req.params.id;
    var update = req.body;
    if(update.numberMachine && update.square)
    {
        Machine.find({ $and: [
            {numberMachine: update.numberMachine},
            {square: update.square}
        ]}).exec((err, machines) => {
            if(err) return Methods.responseErrorServer(res);
            if(machines && machines.length >= 1) return Methods.responseNotAccepted(res, "Esta máquina ya existe. Intente con otro.");
            else
            {
                Machine.findByIdAndUpdate(machineId, update, {new: true}, (err, machineUpdated) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!machineUpdated) return Methods.responseNotAccepted(res, "Ocurrio un error al actualizar la máquina. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Máquina actualizada correctamente.");
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

//Función Eliminar Maquina
function removeMachine(req, res)
{
    var machineId = req.params.id;
    Machine.findByIdAndRemove(machineId, (err, machineRemoved) => {
        if(err) return Methods.responseErrorServer(res);
        if(!machineRemoved) return Methods.responseNotAccepted(res, "Ocurrio un error al eliminar la máquina. Intentelo de nuevo.");
        else
        {
            return Methods.responseOk(res, "Máquina eliminada correctamente.");
        }
    });
}

//Exportar
module.exports = {
    createMachine,
    getMachine,
    getMachines,
    updateMachine,
    removeMachine
}