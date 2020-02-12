'use strict'

//Librerias

//Carga de Modelos
var Product = require('../models/product');

//Carga de Métodos
var Methods = require('../status/methods');

//Función Crear Producto
function createProduct(req, res)
{
    var params = req.body;
    var product = new Product();
    if(params.productName && params.numberPart && params.version && params.customer)
    {
        product.productName = params.productName;
        product.numberPart = params.numberPart;
        product.version = params.version;
        product.customer = params.customer;
        Product.find({numberPart: product.numberPart}, (err, products) => {
            if(err) return Methods.responseErrorServer(res);
            if(products && products.length >= 1) return Methods.responseNotAccepted(res, "Este número de parte ya existe. Intente con otro.");
            else
            {
                product.save((err, productStored) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!productStored) return Methods.responseNotAccepted(res, "Ocurrio un error al crear el producto. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Producto creado correctamente.");
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

//Función Obtener Producto
function getProduct(req, res)
{
    var productId = req.params.id;
    Product.findById(productId).populate({ path: "customer" }).exec((err, products) => {
        if(err) return Methods.responseErrorServer(res);
        if(!products) return Methods.responseNotFound(res, "No se ha encontrado este producto. Intente con otro.");
        else
        {
            return Methods.responseOk(res, products);
        }
    });
}

//Función Obtener Productos
function getProducts(req, res)
{
    Product.find().populate({ path: "customer" }).exec((err, products) => {
        if(err) return Methods.responseErrorServer(res);
        if(!products) return Methods.responseNotFound(res, "No se han encontrado productos.");
        else
        {
            return Methods.responseOk(res, products);
        }
    });
}

//Función Actualizar Producto
function updateProduct(req, res)
{
    var productId = req.params.id;
    var update = req.body;
    if(update.productName && update.numberPart && update.version && update.customer)
    {
        Product.find({numberPart: update.numberPart}, (err, products) => {
            if(err) return Methods.responseErrorServer(res);
            if(products && products.length >= 1) return Methods.responseNotAccepted(res, "Este número de parte ya existe. Intente con otro.");
            else
            {
                Product.findByIdAndUpdate(productId, update, {new: true}, (err, productUpdated) => {
                    if(err) return Methods.responseErrorServer(res);
                    if(!productUpdated) return Methods.responseNotAccepted(res, "Ocurrio un error al actualizar el producto. Intentelo de nuevo.");
                    else
                    {
                        return Methods.responseCreated(res, "Producto actualizado correctamente.");
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

//Función Eliminar Producto
function removeProduct(req, res)
{
    var productId = req.params.id;
    Product.findByIdAndRemove(productId, (err, productRemoved) => {
        if(err) return Methods.responseErrorServer(res);
        if(!productRemoved) return Methods.responseNotAccepted(res, "Ocurrio un error al eliminar el producto. Intentelo de nuevo.");
        else
        {
            return Methods.responseOk(res, "Producto eliminado correctamente.");
        }
    });
}

//Exportar
module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    removeProduct
}