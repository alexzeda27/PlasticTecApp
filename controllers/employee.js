'use strict'

//Librerias
var bcrypt = require('bcrypt-nodejs');

//Carga de modelos
var Employee = require('../models/employee');

//Carga de métodos
var Methods = require('../status/methods');

//Función Crear Empleado
function createEmployee(req, res)
{
    var params = req.body;
    var employee = new Employee();
    if(params.payroll && params.name && params.surnameP && params.username && params.password && params.position && params.department)
    {
        employee.payroll = params.payroll;
        employee.name = params.name;
        employee.surnameP = params.surnameP;
        employee.surnameM = params.surnameM;
        employee.username = params.username;
        employee.email = params.email;
        employee.position = params.position;
        employee.department = params.department;
        Employee.find({payroll: employee.payroll}, (err, employees) => {
            if(err) return Methods.responseErrorServer(res);
            if(employees && employees.length >= 1) return Methods.responseNotAccepted(res, "Este empleado ya existe. Intente con otro.");
            else
            {
                bcrypt.hash(params.password, null, null, (err, hash) => {
                    employee.password = hash;
                    employee.save((err, employees) => {
                        if(err) return Methods.responseErrorServer(res);
                        if(!employees) return Methods.responseNotAccepted(res, "Ocurrió un error al crear al empleado. Intentelo de nuevo.");
                        else
                        {
                            return Methods.responseCreated(res, "Empleado creado correctamente.");
                        }
                    });
                });
            }
        });
    }
    else
    {
        return Methods.responseNotAccepted(res, "No puede dejar campos vacios en el formulario.");
    }
}

//Función Obtener Empleado
function getEmployee(req, res)
{
    var employeeId = req.params.id;
    Employee.findById(employeeId).populate([{path: "position", populate: [{path: "typeWorker", path: "costCenter"}]}, {path: "department"}]).exec((err, employees) => {
        if(err) return Methods.responseErrorServer(res);
        if(!employees) return Methods.responseNotFound(res, "No se ha encontrado este empleado. Intente con otro.");
        else
        {
            return Methods.responseOk(res, employees);
        }
    });
}

//Función Obtener Empleados
function getEmployees(req, res)
{
    Employee.find().populate([{path: "position", populate: [{path: "typeWorker"}, {path: "costCenter"}]}, {path: "department"}]).exec((err, employees) => {
        if(err) return Methods.responseErrorServer(res);
        if(!employees) return Methods.responseNotFound(res, "No se han encontrado empleados.");
        else
        {
            return Methods.responseOk(res, employees);
        }
    });
}

//Función Actualizar Empleado
function updateEmployees(req, res)
{
    var employeeId = req.params.id;
    var update = req.body;
    if(update.payroll && update.name && update.surnameP && update.username && update.password && update.position && update.department)
    {
        Employee.find({payroll: update.payroll}, (err, employees) => {
            if(err) return Methods.responseErrorServer(res);
            if(employees && employees.length >= 1) return Methods.responseNotAccepted(res, "Este empleado ya existe. Intente con otro.");
            else
            {
                Employee.findByIdAndUpdate(employeeId, update, {new: true}, (err, employeeUpdated) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!employeeUpdated) return Methods.responseNotAccepted(res, "Ocurrió un error al actualizar el empleado. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Empleado actualizado correctamente");
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

//Función Eliminar Empleado
function removeEmployee(req, res)
{
    var employeeId = req.params.id;
    Employee.findByIdAndRemove(employeeId, (err, employeeRemoved) => {
        if(err) return Methods.responseErrorServer(res);
        if(!employeeRemoved) return Methods.responseNotAccepted(res, "Ocurrió un error al eliminar el empleado. Intentelo de nuevo.");
        else
        {
            return Methods.responseOk(res, "Empleado eliminado correctamente");
        }
    });
}

module.exports = {
    createEmployee,
    getEmployee,
    getEmployees,
    updateEmployees,
    removeEmployee
}