'use strict'

//Librerias

//Carga de modelos
var Department = require('../models/department');

//Carga de métodos
var Methods = require('../status/methods');

//Función Crear Departamento
function createDepartment(req, res)
{
    var params = req.body;
    var department = new Department();
    if(params.departmentName)
    {
        department.departmentName = params.departmentName;
        Department.find({departmentName: department.departmentName}, (err, departments) => {
            if(err) return Methods.responseErrorServer(res);
            if(departments && departments.length >= 1) return Methods.responseNotAccepted(res, "Este departamento ya existe. Intente con otro.");
            else
            {
                department.save((err, departmentStored) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!departmentStored) return Methods.responseNotAccepted(res, "Ocurrió un error al crear el departamento. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Departamento creado correctamente.");
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

//Función Obtener Departamento
function getDepartment(req, res)
{
    var departmentId = req.params.id;
    Department.findById(departmentId, (err, departments) => {
        if(err) return Methods.responseErrorServer(res);
        if(!departments) return Methods.responseNotFound(res, "No se ha encontrado este departamento. Intente con otro.");
        else
        {
            return Methods.responseOk(res, departments);
        }
    });
}

//Función Obtener Departamentos
function getDepartments(req, res)
{
    Department.find((err, departments) => {
        if(err) return Methods.responseErrorServer(res);
        if(!departments) return Methods.responseNotFound(res, "No se han encontrado departamentos.");
        else
        {
            return Methods.responseOk(res, departments);
        }
    });
}

//Función Actualizar Departamento
function updateDepartment(req, res)
{
    var departmentId = req.params.id;
    var update = req.body;
    if(update.departmentName)
    {
        Department.find({departmentName: update.departmentName}, (err, departments) => {
            if(err) return Methods.responseErrorServer(res);
            if(departments && departments.length >= 1) return Methods.responseNotAccepted(res, "Este departamento ya existe. Intente con otro.");
            else
            {
                Department.findByIdAndUpdate(departmentId, update, {new: true}, (err, departmentUpdated) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!departmentUpdated) return Methods.responseNotAccepted(res, "Ocurrió un error al actualizar el departamento. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Departamento actualizado correctamente.");
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

//Función Eliminar Departamento
function removeDepartment(req, res)
{
    var departmentId = req.params.id;
    Department.findByIdAndRemove(departmentId, (err, departmentRemoved) => {
        if(err) return Methods.responseErrorServer(res);
        if(!departmentRemoved) return Methods.responseNotAccepted(res, "Ocurrió un error al eliminar el departamento. Intentelo de nuevo.");
        else
        {
            return Methods.responseOk(res, "Departamento eliminado correctamente");
        }
    });
}

//Exportar
module.exports = {
    createDepartment,
    getDepartment,
    getDepartments,
    updateDepartment,
    removeDepartment
}