'use strict'

//Librerias

//Carga de modelos
var Customer = require('../models/customer');

//Carga de métodos
var Methods = require('../status/methods');

//Función Crear Cliente
function createCustomer(req, res)
{
    var params = req.body;
    var customer = new Customer();
    if(params.customerName)
    {
        customer.customerName = params.customerName;
        Customer.find({customerName: customer.customerName}, (err, customers) => {
            if(err) return Methods.responseErrorServer(res);
            if(customers && customers.length >= 1) return Methods.responseNotAccepted(res, "Este cliente ya existe. Intente con otro.");
            else
            {
                customer.save((err, customerStorage) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!customerStorage) return Methods.responseNotAccepted(res, "Ocurrió un error al crear el cliente. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Cliente creado correctamente");
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

//Función Obtener Cliente
function getCustomer(req, res)
{
    var customerId = req.params.id;
    Customer.findById(customerId, (err, customers) => {
        if(err) return Methods.responseErrorServer(res);
        if(!customers) return Methods.responseNotFound(res, "No se ha encontrado este cliente. Intente con otro.");
        else
        {
            return Methods.responseOk(res, customers);
        }
    });
}

//Función Obtener Clientes
function getCustomers(req, res)
{
    Customer.find((err, customers) => {
        if(err) return Methods.responseErrorServer(res);
        if(!customers) return Methods.responseNotFound(res, "No se han encontrado clientes.");
        else
        {
            return Methods.responseOk(res, customers);
        }
    });
}

//Función Actualizar Clientes
function updateCustomer(req, res)
{
    var customerId = req.params.id;
    var update = req.body;
    if(update.customerName)
    {
        Customer.find({customerName: update.customerName}, (err, customers) => {
            if(err) return Methods.responseErrorServer(res);
            if(customers && customers.length >= 1) return Methods.responseNotAccepted(res, "Este cliente ya existe. Intente con otro.");
            else
            {
                Customer.findByIdAndUpdate(customerId, update, {new: true}, (err, customerUpdated) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!customerUpdated) return Methods.responseNotAccepted(res, "Ocurrió un error al actualizar el cliente. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Cliente actualizado correctamente.");
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

//Función Eliminar Clientes
function removeCustomer(req, res)
{
    var customerId = req.params.id;
    Customer.findByIdAndRemove(customerId, (err, customerRemoved) => {
        if(err) return Methods.responseErrorServer(res);
        if(!customerRemoved) return Methods.responseNotAccepted(res, "No se pudo eliminar el cliente. Intentelo de nuevo.");
        else
        {
            return Methods.responseOk(res, "Cliente eliminado correctamente.");
        }
    });
}

//Exportar
module.exports = {
    createCustomer,
    getCustomer,
    getCustomers,
    updateCustomer,
    removeCustomer
}
