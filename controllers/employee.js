'use strict'

//Librerias
var bcrypt = require('bcrypt-nodejs');

//Carga de modelos
var Employee = require('../models/employee');
var Operator = require('../models/operator');
var Supervisor = require('../models/supervisor');

//Carga de métodos
var Methods = require('../status/methods');

//Función Crear Empleado
function createEmployee(req, res)
{
    var params = req.body;
    var employee = new Employee();
    var operator = new Operator();
    var supervisor = new Supervisor();
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
                            //Si el empleado es un Operador de Producción
                            if(employee.position == "5e4415cd012139261080f0e7")
                            {
                                operator.save(employees, (err, employeeOperator) => {
                                    if(err) return Methods.responseErrorServer(res);
                                    if(!employeeOperator) return Methods.responseNotAccepted(res, "Ocurrió un error al crear al operador. Intentelo de nuevo.");
                                    else
                                    {
                                        var operatorId = operator.id;
                                        Operator.findByIdAndUpdate(operatorId, {employee: employees}, {new: true}, (err, operatorUpdated) => {
                                            if(err) return Methods.responseErrorServer(res);
                                            if(!operatorUpdated) return Methods.responseNotAccepted(res, "Ocurrio un error al actualizar al operador. Intentelo de nuevo.");
                                            else
                                            {
                                                return Methods.responseCreated(res, "Operador creado correctamente.");
                                            }
                                        });
                                    }
                                });
                            }
                            //Si el empleado es un Supervisor de Producción
                            else if(employee.position == "5e44146b012139261080f0cf")
                            {
                                supervisor.save(employees, (err, employeeSupervisor) => {
                                    if(err) return Methods.responseErrorServer(res);
                                    if(!employeeSupervisor) return Methods.responseNotAccepted(res, "Ocurrió un error al crear al supervisor. Intentelo de nuevo.");
                                    else
                                    {
                                        var supervisorId = supervisor.id;
                                        Supervisor.findByIdAndUpdate(supervisorId, {employee: employees}, {new: true}, (err, supervisorUpdated) => {
                                            if(err) return Methods.responseErrorServer(res);
                                            if(!supervisorUpdated) return Methods.responseNotAccepted(res, "Ocurrio un error al actualizar al supervisor. Intentelo de nuevo.");
                                            else
                                            {
                                                return Methods.responseCreated(res, "Supervisor creado correctamente.");
                                            }
                                        });
                                    }
                                });
                            }
                            //Si el empleado no es Operador ni Supervisor de Producción
                            else
                            {
                                return Methods.responseCreated(res, "Empleado creado correctamente.");
                            }
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
    var operator = new Operator();
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
                        //Si el puesto a actualizar es igual al puesto de Operador de Producción
                        if(update.position == "5e4415cd012139261080f0e7")
                        {
                            operator.save(employeeUpdated, (err, employeeOperator) => {
                                if(err) return Methods.responseErrorServer(res);
                                if(!employeeOperator) return Methods.responseNotAccepted(res, "Ocurrió un error al crear al operador. Intentelo de nuevo.");
                                else
                                {
                                    var operatorId = operator.id;
                                    Operator.findByIdAndUpdate(operatorId, {employee: employeeUpdated}, {new: true}, (err, operatorUpdated) => {
                                        if(err) return Methods.responseErrorServer(res);
                                        if(!operatorUpdated) return Methods.responseNotAccepted(res, "Ocurrio un error al actualizar al operador. Intentelo de nuevo.");
                                        else
                                        {
                                            return Methods.responseCreated(res, "Empleado actualizado correctamente. Ahora el empleado es un Operador de Producción.");
                                        }
                                    });
                                }
                            });
                        }
                        //Si el puesto a actualizar es igual al puesto de Supervisor de Producción
                        else if(update.position == "5e44146b012139261080f0cf")
                        {
                            supervisor.save(employeeUpdated, (err, employeeSupervisor) => {
                                if(err) return Methods.responseErrorServer(res);
                                if(!employeeSupervisor) return Methods.responseNotAccepted(res, "Ocurrió un error al crear al supervisor. Intentelo de nuevo.");
                                else
                                {
                                    var supervisorId = supervisor.id;
                                    Supervisor.findByIdAndUpdate(supervisorId, {employee: employeeUpdated}, {new: true}, (err, supervisorUpdated) => {
                                        if(err) return Methods.responseErrorServer(res);
                                        if(!supervisorUpdated) return Methods.responseNotAccepted(res, "Ocurrio un error al actualizar al supervisor. Intentelo de nuevo.");
                                        else
                                        {
                                            return Methods.responseCreated(res, "Empleado actualizado correctamente. Ahora el empleado es un Supervisor de Producción.");
                                        }
                                    });
                                }
                            });
                        }
                        //Si el puesto a actualizar no es Operador, ni Supervisor de Producción
                        else
                        {
                            return Methods.responseCreated(res, "Empleado actualizado con exito.");
                        }
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
            //Si el empleado es un Operador de Producción
            if(employeeRemoved.position == "5e4415cd012139261080f0e7")
            {
                Operator.findOneAndRemove({employee: employeeRemoved}, (err, operatorRemoved) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!operatorRemoved) return Methods.responseNotAccepted(res, "Ocurrio un error al eliminar al operador. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseOk(res, "Empleado/Operador eliminado correctamente.");
                    }
                });
            }
            //Si el empleado es un Supervisor de Producción
            else if(employeeRemoved.position == "5e44146b012139261080f0cf")
            {
                Supervisor.findOneAndRemove({employee: employeeRemoved}, (err, supervisorRemoved) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!supervisorRemoved) return Methods.responseNotAccepted(res, "Ocurrio un error al eliminar al supervisor. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseOk(res, "Empleado/Supervisor eliminado correctamente.");
                    }
                });
            }
            //Si el empleado no es un Operador, ni Supervisor de Producción
            else
            {
                return Methods.responseOk(res, "Empleado eliminado correctamente.");
            }
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