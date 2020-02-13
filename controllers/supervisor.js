'use strict'

//Librerias

//Carga de Modelos
var Supervisor = require('../models/supervisor');

//Carga de Métodos
var Methods = require('../status/methods');

//Función Obtener Supervisor
function getSupervisor(req, res)
{
    var supervisorId = req.params.id;
    Supervisor.findById(supervisorId).populate({ path: "employee", populate: [{ path: "position", populate: [{ path: "typeWorker" }, { path: "costCenter" }] }, { path: "department" }] }).exec((err, supervisors) => {
        if(err) return Methods.responseErrorServer(res);
        if(!supervisors) return Methods.responseNotFound(res, "No se ha encontrado al supervisor. Intentelo de nuevo.");
        else
        {
            return Methods.responseOk(res, supervisors);
        }
    });
}

//Función Obtener Supervisores
function getSupervisors(req, res)
{
    Supervisor.find().populate({ path: "employee", populate: [{ path: "position", populate: [{ path: "typeWorker" }, { path: "costCenter" }] }, { path: "department" }] }).exec((err, supervisors) => {
        if(err) return Methods.responseErrorServer(res);
        if(!supervisors) return Methods.responseNotFound(res, "No hay supervisores.");
        else
        {
            return Methods.responseOk(res, supervisors);
        }
    });
}

//Función Actualizar Supervisores

//Función Eliminar Supervisores
function removeSupervisor(req, res)
{
    var supervisorId = req.params.id;
    Supervisor.findByIdAndRemove(supervisorId, (err, supervisorRemoved) => {
        if(err) return Methods.responseErrorServer(res);
        if(!supervisorRemoved) return Methods.responseNotAccepted(res, "Ocurrio un error al eliminar al supervisor. Intentelo de nuevo.");
        else
        {
            return Methods.responseOk(res, "Supervisor eliminado correctamente.");
        }
    });
}

//Exportar
module.exports = {
    getSupervisor,
    getSupervisors,
    removeSupervisor
}