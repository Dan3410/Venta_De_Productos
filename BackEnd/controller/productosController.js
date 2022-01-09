const resModifier = require("./resModifier");
const tokenFunctions = require("./tokenFunctions");
const accountFunctions = require("./accountFunctions");
const productFunctions = require("./productFunctions");
const productosModel = require("../models/productosModel");

module.exports = {
  getAllProducts: async function (req, res, next) {
    try {
      const productos = await productosModel.find().populate("");
      resModifier.modifyRes(res, "Success", "Items Extracted", productos);
    } catch (e) {
      resModifier.modifyRes(
        res,
        "Error",
        "Error al obtener los items: " + e.message,
        null
      );
    }
  },
  getProductById: async function (req, res, next) {
    try {
      const producto = await productosModel
        .findById({ _id: req.params.id })
        .select({
          name: 1,
          price: 1,
          code: 1,
          description: 1,
          category: 1,
          photo: 1,
        });
      resModifier.modifyRes(res, "Success", "Item Found", producto);
    } catch (e) {
      resModifier.modifyRes(
        res,
        "Error",
        "Error al obtener el item: " + e.message,
        null
      );
    }
  },
  createProduct: async function (req, res, next) {
    try {
      const token = tokenFunctions.extractToken(req);
      const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
      await accountFunctions.checkPrivilege(tokenDecoded.username, res);
      const producto = productFunctions.createProduct(req.body.productData);
      const documento = await producto.save();
      resModifier.modifyRes(
        res,
        "Success",
        "Item Uploaded to Database",
        documento
      );
    } catch (e) {
      resModifier.modifyRes(
        res,
        "Error",
        "Error al cargar los datos: " + e.message,
        null
      );
    }
  },

  updateProduct: async function (req, res, next) {
    try {
      const token = tokenFunctions.extractToken(req);
      const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
      await accountFunctions.checkPrivilege(tokenDecoded.username, res);
      const producto = await productosModel.updateOne(
        { _id: req.params.id },
        req.body.productData
      );
      resModifier.modifyRes(res, "Success", "Item Data Modified", producto);
    } catch (e) {
      resModifier.modifyRes(
        res,
        "Error",
        "Error al actualizar los datos: " + e.message,
        null
      );
    }
  },

  deleteProduct: async function (req, res, next) {
    try {
      const token = tokenFunctions.extractToken(req);
      const tokenDecoded = await tokenFunctions.checkTokenValid(token, req);
      await accountFunctions.checkPrivilege(tokenDecoded.username, res);
      const producto = await productosModel.deleteOne({ _id: req.params.id });
      resModifier.modifyRes(res, "Success", "Item Deleted", producto);
    } catch (e) {
      resModifier.modifyRes(
        res,
        "Error",
        "Error al borrar el producto: " + e.message,
        null
      );
    }
  } /*Si no tiene privilegios o el token es invalido, se modifico el res en alguna de las
       que fallo, entonces no deberia modificarlo aca */,
};
